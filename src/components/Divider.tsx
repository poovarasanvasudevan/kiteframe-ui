import type { HTMLAttributes } from 'react'
import { cx } from '../utils/cx'

export type DividerProps = HTMLAttributes<HTMLHRElement> & {
  orientation?: 'horizontal' | 'vertical'
}

export function Divider({ orientation = 'horizontal', className, ...props }: DividerProps) {
  return (
    <hr
      className={cx('kf-divider', orientation === 'vertical' && 'kf-divider--vertical', className)}
      {...props}
    />
  )
}
