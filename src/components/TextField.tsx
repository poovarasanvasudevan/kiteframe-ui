import { forwardRef, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react'
import { cx } from '../utils/cx'

type FieldChrome = {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  className?: string
}

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & FieldChrome

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, hint, error, className, id, ...props },
  ref,
) {
  const fieldId = id ?? props.name
  return (
    <label className={cx('kf-field', Boolean(error) && 'kf-field--error', className)} htmlFor={fieldId}>
      {label ? <span className="kf-field__label">{label}</span> : null}
      <input ref={ref} id={fieldId} className="kf-input" aria-invalid={Boolean(error) || undefined} {...props} />
      {error ? <span className="kf-field__error">{error}</span> : hint ? <span className="kf-field__hint">{hint}</span> : null}
    </label>
  )
})

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & FieldChrome

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, hint, error, className, id, ...props },
  ref,
) {
  const fieldId = id ?? props.name
  return (
    <label className={cx('kf-field', Boolean(error) && 'kf-field--error', className)} htmlFor={fieldId}>
      {label ? <span className="kf-field__label">{label}</span> : null}
      <textarea ref={ref} id={fieldId} className="kf-textarea" aria-invalid={Boolean(error) || undefined} {...props} />
      {error ? <span className="kf-field__error">{error}</span> : hint ? <span className="kf-field__hint">{hint}</span> : null}
    </label>
  )
})
