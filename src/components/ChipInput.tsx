import {
  forwardRef,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { useControllableState } from '../hooks/useControllableState'
import { cx } from '../utils/cx'
import { Chip, type ChipTone } from './Chip'

export type ChipInputProps = {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  /** Max number of chips. Omit for unlimited. */
  max?: number
  /** Allow duplicate values. Defaults to false. */
  allowDuplicates?: boolean
  /** Characters that commit the current draft into a chip. Defaults to Enter and comma. */
  delimiters?: string[]
  tone?: ChipTone
  className?: string
  id?: string
  name?: string
  'aria-label'?: string
}

function normalizeToken(raw: string) {
  return raw.trim()
}

/** Tag/chip input: type a value and press Enter or comma to add; Backspace removes the last chip. */
export const ChipInput = forwardRef<HTMLInputElement, ChipInputProps>(function ChipInput(
  {
    label,
    hint,
    error,
    value,
    defaultValue = [],
    onValueChange,
    placeholder = 'Add…',
    disabled,
    readOnly,
    max,
    allowDuplicates = false,
    delimiters = [',', 'Enter'],
    tone = 'neutral',
    className,
    id,
    name,
    'aria-label': ariaLabel,
  },
  ref,
) {
  const reactId = useId()
  const fieldId = id ?? name ?? `${reactId}-input`
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [chips, setChips] = useControllableState({
    value,
    defaultValue,
    onChange: onValueChange,
  })
  const [draft, setDraft] = useState('')

  const atLimit = typeof max === 'number' && chips.length >= max
  const canEdit = !disabled && !readOnly && !atLimit

  const setInputRef = (node: HTMLInputElement | null) => {
    inputRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) ref.current = node
  }

  const addTokens = (raw: string) => {
    const parts = raw
      .split(/[,;\n]+/)
      .map(normalizeToken)
      .filter(Boolean)
    if (!parts.length) return

    setChips((prev) => {
      const next = [...prev]
      for (const part of parts) {
        if (typeof max === 'number' && next.length >= max) break
        if (!allowDuplicates && next.includes(part)) continue
        next.push(part)
      }
      return next
    })
    setDraft('')
  }

  const removeAt = (index: number) => {
    if (disabled || readOnly) return
    setChips((prev) => prev.filter((_, i) => i !== index))
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (disabled || readOnly) return

    if (event.key === 'Backspace' && draft === '' && chips.length > 0) {
      event.preventDefault()
      removeAt(chips.length - 1)
      return
    }

    const isDelimiter =
      delimiters.includes(event.key) ||
      (event.key === ',' && delimiters.includes(',')) ||
      (event.key === ';' && delimiters.includes(';'))

    if (isDelimiter) {
      event.preventDefault()
      if (draft.trim()) addTokens(draft)
    }
  }

  return (
    <div className={cx('kf-field', Boolean(error) && 'kf-field--error', 'kf-chip-input', className)}>
      {label ? (
        <label className="kf-field__label" htmlFor={fieldId}>
          {label}
        </label>
      ) : null}
      {name
        ? chips.map((chip, index) => (
            <input key={`${chip}-${index}`} type="hidden" name={`${name}[]`} value={chip} />
          ))
        : null}
      <div
        className={cx(
          'kf-chip-input__control',
          disabled && 'kf-chip-input__control--disabled',
          Boolean(error) && 'kf-chip-input__control--error',
        )}
        onClick={() => {
          if (!disabled) inputRef.current?.focus()
        }}
      >
        <div className="kf-chip-input__chips" role="list" aria-label={ariaLabel ?? (typeof label === 'string' ? label : 'Tags')}>
          {chips.map((chip, index) => (
            <span key={`${chip}-${index}`} role="listitem">
              <Chip
                tone={tone}
                removeLabel={`Remove ${chip}`}
                onRemove={disabled || readOnly ? undefined : () => removeAt(index)}
              >
                {chip}
              </Chip>
            </span>
          ))}
          <input
            ref={setInputRef}
            id={fieldId}
            type="text"
            className="kf-chip-input__field"
            value={draft}
            disabled={disabled || atLimit}
            readOnly={readOnly}
            placeholder={chips.length === 0 ? placeholder : undefined}
            aria-invalid={Boolean(error) || undefined}
            aria-label={ariaLabel}
            onChange={(event) => {
              const next = event.target.value
              if (next.includes(',') || next.includes(';')) {
                addTokens(next)
                return
              }
              setDraft(next)
            }}
            onKeyDown={onKeyDown}
            onBlur={() => {
              if (draft.trim() && canEdit) addTokens(draft)
            }}
          />
        </div>
      </div>
      {error ? (
        <span className="kf-field__error">{error}</span>
      ) : hint ? (
        <span className="kf-field__hint">{hint}</span>
      ) : atLimit ? (
        <span className="kf-field__hint">Maximum of {max} tags</span>
      ) : null}
    </div>
  )
})
