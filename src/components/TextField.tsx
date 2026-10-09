import { forwardRef, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react'
import { cx } from '../utils/cx'

type FieldChrome = {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  prefix?: ReactNode
  suffix?: ReactNode
  className?: string
}

function FieldLabel({ label, required }: { label: ReactNode; required?: boolean }) {
  if (typeof label !== 'string') {
    return <span className="kf-field__label">{label}{required ? <span className="kf-field__required" aria-hidden="true">*</span> : null}</span>
  }
  const hasMarker = /\s\*$/.test(label)
  return (
    <span className="kf-field__label">
      {hasMarker ? label.slice(0, -2) : label}
      {hasMarker || required ? <span className="kf-field__required" aria-hidden="true">*</span> : null}
    </span>
  )
}

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & FieldChrome

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, hint, error, prefix, suffix, className, id, required, ...props },
  ref,
) {
  const fieldId = id ?? props.name
  return (
    <label className={cx('kf-field', Boolean(error) && 'kf-field--error', className)} htmlFor={fieldId}>
      {label ? <FieldLabel label={label} required={required} /> : null}
      <div className={cx('kf-input-wrap', Boolean(prefix) && 'kf-input-wrap--prefix', Boolean(suffix) && 'kf-input-wrap--suffix')}>
        {prefix ? <span className="kf-input__affix kf-input__prefix">{prefix}</span> : null}
        <input ref={ref} id={fieldId} required={required} className="kf-input" aria-invalid={Boolean(error) || undefined} {...props} />
        {suffix ? <span className="kf-input__affix kf-input__suffix">{suffix}</span> : null}
      </div>
      {error ? <span className="kf-field__error">{error}</span> : hint ? <span className="kf-field__hint">{hint}</span> : null}
    </label>
  )
})

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & FieldChrome

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, hint, error, className, id, required, ...props },
  ref,
) {
  const fieldId = id ?? props.name
  return (
    <label className={cx('kf-field', Boolean(error) && 'kf-field--error', className)} htmlFor={fieldId}>
      {label ? <FieldLabel label={label} required={required} /> : null}
      <textarea ref={ref} id={fieldId} required={required} className="kf-textarea" aria-invalid={Boolean(error) || undefined} {...props} />
      {error ? <span className="kf-field__error">{error}</span> : hint ? <span className="kf-field__hint">{hint}</span> : null}
    </label>
  )
})
