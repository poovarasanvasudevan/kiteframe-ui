import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { useControllableState } from '../hooks/useControllableState'
import { cx } from '../utils/cx'

export type SelectOption = {
  value: string
  label: string
  disabled?: boolean
  /** Optional leading icon (also used by FilteredSelect). */
  icon?: ReactNode
  description?: string
}

type SelectBaseProps = {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  options?: SelectOption[]
  placeholder?: string
  disabled?: boolean
  className?: string
  id?: string
  name?: string
  'aria-label'?: string
}

export type SelectSingleProps = SelectBaseProps & {
  multiple?: false
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

export type SelectMultipleProps = SelectBaseProps & {
  multiple: true
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

export type SelectProps = SelectSingleProps | SelectMultipleProps

function normalizeSingleDefault(defaultValue?: string | string[]) {
  if (typeof defaultValue === 'string') return defaultValue
  if (Array.isArray(defaultValue)) return defaultValue[0] ?? ''
  return ''
}

function normalizeMultipleDefault(defaultValue?: string | string[]) {
  if (Array.isArray(defaultValue)) return defaultValue
  if (typeof defaultValue === 'string' && defaultValue) return [defaultValue]
  return []
}

export function Select(props: SelectProps) {
  const {
    label,
    hint,
    error,
    options = [],
    placeholder = 'Choose…',
    disabled,
    className,
    id,
    name,
    'aria-label': ariaLabel,
  } = props
  const multiple = props.multiple === true

  const reactId = useId()
  const listboxId = `${reactId}-listbox`
  const fieldId = id ?? name ?? `${reactId}-trigger`
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const [selected, setSelected] = useControllableState<string | string[]>({
    value: props.value,
    defaultValue: multiple
      ? normalizeMultipleDefault(props.defaultValue)
      : normalizeSingleDefault(props.defaultValue),
    onChange: props.onValueChange as ((value: string | string[]) => void) | undefined,
  })

  const selectedValues = useMemo(() => {
    if (multiple) return Array.isArray(selected) ? selected : selected ? [String(selected)] : []
    return []
  }, [multiple, selected])

  const enabledOptions = useMemo(() => options.filter((option) => !option.disabled), [options])
  const selectedOption = !multiple ? options.find((option) => option.value === selected) : undefined
  const selectedOptions = multiple
    ? options.filter((option) => selectedValues.includes(option.value))
    : []
  const hasSelection = multiple ? selectedValues.length > 0 : Boolean(selectedOption)
  const displayLabel = selectedOption?.label

  const isOptionSelected = (value: string) =>
    multiple ? selectedValues.includes(value) : selected === value

  useEffect(() => {
    if (!open) return
    const selectedIdx = enabledOptions.findIndex((option) => isOptionSelected(option.value))
    setActiveIndex(selectedIdx >= 0 ? selectedIdx : 0)
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, enabledOptions, selected, multiple, selectedValues])

  const pick = (next: string) => {
    if (multiple) {
      const current = Array.isArray(selected) ? selected : []
      const nextValues = current.includes(next)
        ? current.filter((value) => value !== next)
        : [...current, next]
      setSelected(nextValues)
      return
    }
    setSelected(next)
    setOpen(false)
  }

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setOpen(true)
    }
  }

  const onListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!enabledOptions.length) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index) => (index + 1) % enabledOptions.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => (index <= 0 ? enabledOptions.length - 1 : index - 1))
    } else if (event.key === 'Home') {
      event.preventDefault()
      setActiveIndex(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      setActiveIndex(enabledOptions.length - 1)
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      const option = enabledOptions[activeIndex]
      if (option) pick(option.value)
    } else if (event.key === 'Escape') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Tab') {
      setOpen(false)
    }
  }

  return (
    <div
      ref={rootRef}
      className={cx(
        'kf-field',
        Boolean(error) && 'kf-field--error',
        'kf-select',
        multiple && 'kf-select--multiple',
        className,
      )}
    >
      {label ? (
        <label className="kf-field__label" htmlFor={fieldId}>
          {label}
        </label>
      ) : null}
      {name ? (
        multiple ? (
          selectedValues.map((value) => (
            <input key={value || '__empty'} type="hidden" name={name} value={value} />
          ))
        ) : (
          <input type="hidden" name={name} value={typeof selected === 'string' ? selected : ''} />
        )
      ) : null}
      <button
        id={fieldId}
        type="button"
        className={cx(
          'kf-select__trigger',
          multiple && 'kf-select__trigger--multiple',
          !hasSelection && 'kf-select__trigger--placeholder',
        )}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-invalid={Boolean(error) || undefined}
        aria-label={ariaLabel}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        onKeyDown={onTriggerKeyDown}
      >
        <span className="kf-select__value">
          {multiple ? (
            selectedOptions.length === 0 ? (
              placeholder
            ) : (
              <span className="kf-select__tags">
                {selectedOptions.map((option) => (
                  <span key={option.value} className="kf-select__tag">
                    {option.label}
                  </span>
                ))}
              </span>
            )
          ) : (
            (displayLabel ?? placeholder)
          )}
        </span>
        <ChevronDown className="kf-select__chevron" size={14} aria-hidden />
      </button>
      {open ? (
        <div
          id={listboxId}
          className="kf-select__menu"
          role="listbox"
          tabIndex={-1}
          aria-multiselectable={multiple || undefined}
          aria-activedescendant={
            activeIndex >= 0 ? `${reactId}-option-${enabledOptions[activeIndex]?.value}` : undefined
          }
          onKeyDown={onListKeyDown}
          ref={(node) => node?.focus()}
        >
          {options.length === 0 ? (
            <div className="kf-select__empty">No options</div>
          ) : (
            options.map((option) => {
              const selectedNow = isOptionSelected(option.value)
              const enabledIdx = enabledOptions.findIndex((item) => item.value === option.value)
              const isActive = !option.disabled && enabledIdx === activeIndex
              return (
                <button
                  key={option.value || '__empty'}
                  id={`${reactId}-option-${option.value}`}
                  type="button"
                  role="option"
                  disabled={option.disabled}
                  aria-selected={selectedNow}
                  data-active={isActive || undefined}
                  className={cx('kf-select__option', selectedNow && 'is-selected', isActive && 'is-active')}
                  onMouseEnter={() => {
                    if (!option.disabled && enabledIdx >= 0) setActiveIndex(enabledIdx)
                  }}
                  onClick={() => {
                    if (!option.disabled) pick(option.value)
                  }}
                >
                  <span className="kf-select__option-label">{option.label}</span>
                  {selectedNow ? <Check className="kf-select__check" size={14} aria-hidden /> : null}
                </button>
              )
            })
          )}
        </div>
      ) : null}
      {error ? <span className="kf-field__error">{error}</span> : hint ? <span className="kf-field__hint">{hint}</span> : null}
    </div>
  )
}
