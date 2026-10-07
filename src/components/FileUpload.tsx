import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { cx } from '../utils/cx'

export type FileUploadProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & {
  label?: ReactNode
  hint?: ReactNode
  preview?: ReactNode
  uploadLabel?: string
}

/** Image/file upload tile with placeholder and upload action link. */
export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(function FileUpload(
  { label, hint, preview, uploadLabel = 'Upload', className, id, disabled, ...props },
  ref,
) {
  const autoId = useId()
  const fieldId = id ?? autoId
  return (
    <div className={cx('kf-upload', disabled && 'kf-upload--disabled', className)}>
      {label ? (
        <span className="kf-upload__label" id={`${fieldId}-label`}>
          {label}
        </span>
      ) : null}
      <div className="kf-upload__box">
        <div className="kf-upload__preview">{preview ?? <span className="kf-upload__placeholder" />}</div>
        <label htmlFor={fieldId} className={cx('kf-link', disabled && 'kf-upload--disabled')}>
          {uploadLabel}
        </label>
        <input
          ref={ref}
          id={fieldId}
          type="file"
          className="kf-upload__input"
          disabled={disabled}
          aria-labelledby={label ? `${fieldId}-label` : undefined}
          {...props}
        />
      </div>
      {hint ? <p className="kf-upload__hint">{hint}</p> : null}
    </div>
  )
})
