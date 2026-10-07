import type { HTMLAttributes } from 'react'
import { cx } from '../utils/cx'

export type SpinnerProps = HTMLAttributes<HTMLSpanElement> & {
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

export function Spinner({ size = 'md', label = 'Loading', className, ...props }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cx('kf-spinner', size !== 'md' && `kf-spinner--${size}`, className)}
      {...props}
    />
  )
}
