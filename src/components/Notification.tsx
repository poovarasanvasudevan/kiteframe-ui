import { useEffect, type HTMLAttributes, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react'
import { cx } from '../utils/cx'

export type NotificationTone = 'info' | 'success' | 'warning' | 'danger'

export type NotificationPlacement = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

export type NotificationProps = HTMLAttributes<HTMLDivElement> & {
  tone?: NotificationTone
  title?: ReactNode
  icon?: ReactNode | false
  onDismiss?: () => void
  dismissLabel?: string
  actions?: ReactNode
  /** Auto-dismiss after ms. Omit or `0` to keep until dismissed. */
  duration?: number
}

const defaultIcons: Record<NotificationTone, ReactNode> = {
  info: <Info />,
  success: <CheckCircle2 />,
  warning: <AlertTriangle />,
  danger: <XCircle />,
}

/** Ephemeral toast-style message. Stack inside `NotificationViewport`. */
export function Notification({
  tone = 'info',
  title,
  icon,
  onDismiss,
  dismissLabel = 'Dismiss notification',
  actions,
  duration = 0,
  className,
  children,
  ...props
}: NotificationProps) {
  useEffect(() => {
    if (!onDismiss || !duration || duration <= 0) return
    const timer = window.setTimeout(onDismiss, duration)
    return () => window.clearTimeout(timer)
  }, [duration, onDismiss])

  const resolvedIcon = icon === false ? null : (icon ?? defaultIcons[tone])

  return (
    <div
      role="status"
      aria-live="polite"
      className={cx('kf-notification', `kf-notification--${tone}`, className)}
      {...props}
    >
      {resolvedIcon ? (
        <span className="kf-notification__icon" aria-hidden>
          {resolvedIcon}
        </span>
      ) : null}
      <div className="kf-notification__body">
        {title ? <div className="kf-notification__title">{title}</div> : null}
        {children ? <div className="kf-notification__content">{children}</div> : null}
        {actions ? <div className="kf-notification__actions">{actions}</div> : null}
      </div>
      {onDismiss ? (
        <button
          type="button"
          className="kf-notification__dismiss"
          aria-label={dismissLabel}
          onClick={onDismiss}
        >
          <X />
        </button>
      ) : null}
    </div>
  )
}

export type NotificationViewportProps = HTMLAttributes<HTMLDivElement> & {
  placement?: NotificationPlacement
  children?: ReactNode
}

/** Fixed corner stack for toast notifications. Portals to `document.body`. */
export function NotificationViewport({
  placement = 'top-right',
  className,
  children,
  ...props
}: NotificationViewportProps) {
  if (typeof document === 'undefined') return null
  if (!children) return null

  return createPortal(
    <div
      className={cx('kf-notification-viewport', `kf-notification-viewport--${placement}`, className)}
      data-placement={placement}
      {...props}
    >
      {children}
    </div>,
    document.body,
  )
}
