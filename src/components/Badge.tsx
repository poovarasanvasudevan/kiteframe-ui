import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../utils/cx'

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'org'

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone
  children?: ReactNode
}

/** Compact role/status label (e.g. ORGANIZATION-ADMIN). */
export function Badge({ tone = 'neutral', className, children, ...props }: BadgeProps) {
  return (
    <span className={cx('kf-badge', tone !== 'neutral' && `kf-badge--${tone}`, className)} {...props}>
      {children}
    </span>
  )
}
