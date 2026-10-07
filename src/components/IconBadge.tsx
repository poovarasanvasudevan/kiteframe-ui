import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../utils/cx'

export type IconBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode
  color?: string
  size?: 'sm' | 'md' | 'lg'
}

/** Circular colored icon container used on account / product list rows. */
export function IconBadge({ children, color, size = 'md', className, style, ...props }: IconBadgeProps) {
  return (
    <span
      className={cx('kf-icon-badge', size !== 'md' && `kf-icon-badge--${size}`, className)}
      style={{ background: color, ...style }}
      {...props}
    >
      {children}
    </span>
  )
}
