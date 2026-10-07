import { useEffect, type HTMLAttributes, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { Button } from './Button'
import { cx } from '../utils/cx'

export type DialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: ReactNode
  description?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
  labelledBy?: string
}

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = 'md',
  className,
  labelledBy,
}: DialogProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onOpenChange(false)
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onOpenChange])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div className="kf-dialog-backdrop" onMouseDown={() => onOpenChange(false)}>
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy ?? (title ? 'kf-dialog-title' : undefined)}
        className={cx('kf-dialog', size !== 'md' && `kf-dialog--${size}`, className)}
        onMouseDown={(event) => event.stopPropagation()}
      >
        {(title || description) && (
          <header className="kf-dialog__header">
            <div>
              {title ? (
                <h2 id="kf-dialog-title" className="kf-type kf-type--subtitle">
                  {title}
                </h2>
              ) : null}
              {description ? <p className="kf-type kf-type--caption">{description}</p> : null}
            </div>
            <Button variant="ghost" iconOnly aria-label="Close dialog" onClick={() => onOpenChange(false)}>
              <X size={14} />
            </Button>
          </header>
        )}
        {children ? <div className="kf-dialog__body">{children}</div> : null}
        {footer ? <footer className="kf-dialog__footer">{footer}</footer> : null}
      </section>
    </div>,
    document.body,
  )
}

export function DialogFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('kf-dialog__footer', className)} {...props} />
}
