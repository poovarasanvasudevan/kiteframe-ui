import type { HTMLAttributes, ReactNode } from 'react'
import { Check, X } from 'lucide-react'
import { cx } from '../utils/cx'

export type StatusIndicatorTone = 'success' | 'danger' | 'warning' | 'neutral' | 'muted'

export type StatusIndicatorProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: StatusIndicatorTone
  icon?: ReactNode | 'check' | 'cross' | false
  label: ReactNode
}

/** Inline status with icon + label (Active, Disabled, KiteFrame Login, etc.). */
export function StatusIndicator({
  tone = 'success',
  icon = 'check',
  label,
  className,
  ...props
}: StatusIndicatorProps) {
  let resolved: ReactNode = null
  if (icon === 'check') resolved = <Check />
  else if (icon === 'cross') resolved = <X />
  else if (icon !== false) resolved = icon

  return (
    <span className={cx('kf-status', `kf-status--${tone}`, className)} {...props}>
      {resolved ? <span className="kf-status__icon" aria-hidden>{resolved}</span> : null}
      <span className="kf-status__label">{label}</span>
    </span>
  )
}
