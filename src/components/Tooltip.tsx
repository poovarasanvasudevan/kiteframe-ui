import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../utils/cx'

export type TooltipProps = HTMLAttributes<HTMLSpanElement> & {
  content: ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
  children: ReactNode
}

/** CSS-only hover/focus tooltip wrapper. */
export function Tooltip({
  content,
  placement = 'top',
  className,
  children,
  ...props
}: TooltipProps) {
  return (
    <span className={cx('kf-tooltip', className)} data-placement={placement} {...props}>
      {children}
      <span role="tooltip" className="kf-tooltip__bubble">
        {content}
      </span>
    </span>
  )
}
