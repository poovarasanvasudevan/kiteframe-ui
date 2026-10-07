import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cx } from '../utils/cx'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-outline'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  iconOnly?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'secondary', size = 'md', iconOnly, leftIcon, rightIcon, children, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(
        'kf-btn',
        variant !== 'secondary' && `kf-btn--${variant}`,
        size !== 'md' && `kf-btn--${size}`,
        iconOnly && 'kf-btn--icon',
        className,
      )}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  )
})
