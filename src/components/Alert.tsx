import type { HTMLAttributes, ReactNode } from 'react'
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react'
import { cx } from '../utils/cx'

export type AlertTone = 'info' | 'success' | 'warning' | 'danger'

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  tone?: AlertTone
  title?: ReactNode
  icon?: ReactNode | false
  onDismiss?: () => void
  dismissLabel?: string
  actions?: ReactNode
}

const defaultIcons: Record<AlertTone, ReactNode> = {
  info: <Info />,
  success: <CheckCircle2 />,
  warning: <AlertTriangle />,
  danger: <XCircle />,
}

/** Inline banner for important information, warnings, and status messages. */
export function Alert({
  tone = 'info',
  title,
  icon,
  onDismiss,
  dismissLabel = 'Dismiss',
  actions,
  className,
  children,
  ...props
}: AlertProps) {
  const resolvedIcon = icon === false ? null : (icon ?? defaultIcons[tone])
  return (
    <div
      role="status"
      className={cx('kf-alert', `kf-alert--${tone}`, className)}
      {...props}
    >
      {resolvedIcon ? <span className="kf-alert__icon" aria-hidden>{resolvedIcon}</span> : null}
      <div className="kf-alert__body">
        {title ? <div className="kf-alert__title">{title}</div> : null}
        {children ? <div className="kf-alert__content">{children}</div> : null}
        {actions ? <div className="kf-alert__actions">{actions}</div> : null}
      </div>
      {onDismiss ? (
        <button type="button" className="kf-alert__dismiss" aria-label={dismissLabel} onClick={onDismiss}>
          <X />
        </button>
      ) : null}
    </div>
  )
}
