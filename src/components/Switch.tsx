import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cx } from '../utils/cx'

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & {
  label?: ReactNode
  description?: ReactNode
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, description, className, id, disabled, ...props },
  ref,
) {
  const fieldId = id ?? props.name
  return (
    <label
      className={cx('kf-switch', disabled && 'kf-switch--disabled', className)}
      htmlFor={fieldId}
      data-disabled={disabled || undefined}
    >
      <input
        ref={ref}
        id={fieldId}
        type="checkbox"
        role="switch"
        className="kf-switch__input"
        disabled={disabled}
        {...props}
      />
      <span className="kf-switch__track" aria-hidden>
        <span className="kf-switch__thumb" />
      </span>
      {(label || description) && (
        <span className="kf-switch__text">
          {label ? <span className="kf-switch__label">{label}</span> : null}
          {description ? <span className="kf-switch__desc">{description}</span> : null}
        </span>
      )}
    </label>
  )
})
