import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../utils/cx'

export type ProgressBarTone = 'accent' | 'success' | 'warning' | 'danger' | 'neutral'

export type ProgressBarProps = HTMLAttributes<HTMLDivElement> & {
  value: number
  max?: number
  tone?: ProgressBarTone
  label?: ReactNode
  icon?: ReactNode
  showValue?: boolean
}

/** Labeled progress bar (e.g. customer satisfaction breakdown). */
export function ProgressBar({
  value,
  max = 100,
  tone = 'accent',
  label,
  icon,
  showValue = true,
  className,
  ...props
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className={cx('kf-progress', className)} {...props}>
      {(label || icon || showValue) && (
        <div className="kf-progress__header">
          <span className="kf-progress__label">
            {icon}
            {label}
          </span>
          {showValue ? <span className="kf-progress__value">{Math.round(pct)}%</span> : null}
        </div>
      )}
      <div
        className="kf-progress__track"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={typeof label === 'string' ? label : undefined}
      >
        <div className={cx('kf-progress__fill', `kf-progress__fill--${tone}`)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
