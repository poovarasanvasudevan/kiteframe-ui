import { useEffect, type HTMLAttributes, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { Button } from './Button'
import { cx } from '../utils/cx'

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom'
export type DrawerSize = 'sm' | 'md' | 'lg' | 'full'

export type DrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: ReactNode
  description?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  side?: DrawerSide
  size?: DrawerSize
  className?: string
  labelledBy?: string
  /** Close when clicking the scrim. Defaults to true. */
  closeOnBackdrop?: boolean
}

/** Slide-over panel for filters, details, and secondary forms. */
export function Drawer({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  side = 'right',
  size = 'md',
  className,
  labelledBy,
  closeOnBackdrop = true,
}: DrawerProps) {
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
    <div
      className={cx('kf-drawer-backdrop', `kf-drawer-backdrop--${side}`)}
      onMouseDown={() => {
        if (closeOnBackdrop) onOpenChange(false)
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy ?? (title ? 'kf-drawer-title' : undefined)}
        data-side={side}
        className={cx(
          'kf-drawer',
          `kf-drawer--${side}`,
          size !== 'md' && `kf-drawer--${size}`,
          className,
        )}
        onMouseDown={(event) => event.stopPropagation()}
      >
        {(title || description) && (
          <header className="kf-drawer__header">
            <div className="kf-drawer__titles">
              {title ? (
                <h2 id="kf-drawer-title" className="kf-drawer__title">
                  {title}
                </h2>
              ) : null}
              {description ? <p className="kf-drawer__desc">{description}</p> : null}
            </div>
            <Button variant="ghost" iconOnly aria-label="Close drawer" onClick={() => onOpenChange(false)}>
              <X size={14} />
            </Button>
          </header>
        )}
        {children ? <div className="kf-drawer__body">{children}</div> : null}
        {footer ? <footer className="kf-drawer__footer">{footer}</footer> : null}
      </section>
    </div>,
    document.body,
  )
}

export function DrawerFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('kf-drawer__footer', className)} {...props} />
}
