import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cx } from '../utils/cx'

export type MiniButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Leading icon (lucide or any ReactNode). */
  icon?: ReactNode
  /** Show trailing dropdown chevron. */
  dropdown?: boolean
  children?: ReactNode
}

/**
 * Compact toolbar chip-button: icon + label, optional dropdown chevron.
 * Compose several with `MiniButtonGroup` for divided clusters.
 */
export const MiniButton = forwardRef<HTMLButtonElement, MiniButtonProps>(function MiniButton(
  { icon, dropdown = false, className, children, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx('kf-mini-btn', dropdown && 'kf-mini-btn--dropdown', className)}
      {...props}
    >
      {icon ? (
        <span className="kf-mini-btn__icon" aria-hidden>
          {icon}
        </span>
      ) : null}
      {children ? <span className="kf-mini-btn__label">{children}</span> : null}
      {dropdown ? <ChevronDown className="kf-mini-btn__chevron" size={12} aria-hidden /> : null}
    </button>
  )
})

export type MiniButtonGroupProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
}

/** Horizontal cluster of `MiniButton`s with thin vertical dividers. */
export function MiniButtonGroup({ className, children, ...props }: MiniButtonGroupProps) {
  return (
    <div className={cx('kf-mini-btn-group', className)} role="group" {...props}>
      {children}
    </div>
  )
}
