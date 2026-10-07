import { useEffect, useId, useRef, type HTMLAttributes, type ReactNode } from 'react'
import { useControllableState } from '../hooks/useControllableState'
import { cx } from '../utils/cx'

export type PopoverProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  side?: 'top' | 'bottom' | 'left' | 'right'
  trigger: ReactNode
  children: ReactNode
  className?: string
  contentClassName?: string
}

export function Popover({
  open,
  defaultOpen = false,
  onOpenChange,
  side = 'bottom',
  trigger,
  children,
  className,
  contentClassName,
}: PopoverProps) {
  const [isOpen, setOpen] = useControllableState({ value: open, defaultValue: defaultOpen, onChange: onOpenChange })
  const rootRef = useRef<HTMLDivElement>(null)
  const contentId = useId()

  useEffect(() => {
    if (!isOpen) return
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [isOpen, setOpen])

  return (
    <div ref={rootRef} className={cx('kf-popover', className)}>
      <span
        onClick={() => setOpen(!isOpen)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setOpen(!isOpen)
          }
        }}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        {trigger}
      </span>
      {isOpen ? (
        <div id={contentId} role="dialog" data-side={side} className={cx('kf-popover__content', contentClassName)}>
          {children}
        </div>
      ) : null}
    </div>
  )
}

export function PopoverItem({ className, ...props }: HTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={cx('kf-popover__item', className)} {...props} />
}
