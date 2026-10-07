import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cx } from '../utils/cx'

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & {
  label?: ReactNode
  description?: ReactNode
  indeterminate?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, description, indeterminate, className, id, disabled, ...props },
  ref,
) {
  const fieldId = id ?? props.name
  return (
    <label
      className={cx('kf-check', disabled && 'kf-check--disabled', className)}
      htmlFor={fieldId}
      data-disabled={disabled || undefined}
    >
      <input
        ref={(node) => {
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
          if (node) node.indeterminate = Boolean(indeterminate)
        }}
        id={fieldId}
        type="checkbox"
        className="kf-check__input"
        disabled={disabled}
        {...props}
      />
      <span className="kf-check__box" aria-hidden />
      {(label || description) && (
        <span className="kf-check__text">
          {label ? <span className="kf-check__label">{label}</span> : null}
          {description ? <span className="kf-check__desc">{description}</span> : null}
        </span>
      )}
    </label>
  )
})
