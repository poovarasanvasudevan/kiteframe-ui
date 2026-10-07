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

export type SelectProps = {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  options?: SelectOption[]
  placeholder?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  className?: string
  id?: string
  name?: string
  'aria-label'?: string
}

export function Select({
  label,
  hint,
  error,
  options = [],
  placeholder = 'Choose…',
  value,
  defaultValue = '',
  onValueChange,
  disabled,
  className,
  id,
  name,
  'aria-label': ariaLabel,
}: SelectProps) {
  const reactId = useId()
  const listboxId = `${reactId}-listbox`
  const fieldId = id ?? name ?? `${reactId}-trigger`
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [selected, setSelected] = useControllableState({
    value,
    defaultValue,
    onChange: onValueChange,
  })

  const enabledOptions = useMemo(() => options.filter((option) => !option.disabled), [options])
  const selectedOption = options.find((option) => option.value === selected)
  const displayLabel = selectedOption?.label

  useEffect(() => {
    if (!open) return
    const selectedIdx = enabledOptions.findIndex((option) => option.value === selected)
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
  }, [open, enabledOptions, selected])

  const pick = (next: string) => {
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
    <div ref={rootRef} className={cx('kf-field', Boolean(error) && 'kf-field--error', 'kf-select', className)}>
      {label ? (
        <label className="kf-field__label" htmlFor={fieldId}>
          {label}
        </label>
      ) : null}
      {name ? <input type="hidden" name={name} value={selected} /> : null}
      <button
        id={fieldId}
        type="button"
        className={cx('kf-select__trigger', !displayLabel && 'kf-select__trigger--placeholder')}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-invalid={Boolean(error) || undefined}
        aria-label={ariaLabel}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        onKeyDown={onTriggerKeyDown}
      >
        <span className="kf-select__value">{displayLabel ?? placeholder}</span>
        <ChevronDown className="kf-select__chevron" size={14} aria-hidden />
      </button>
      {open ? (
        <div
          id={listboxId}
          className="kf-select__menu"
          role="listbox"
          tabIndex={-1}
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
              const isSelected = option.value === selected
              const enabledIdx = enabledOptions.findIndex((item) => item.value === option.value)
              const isActive = !option.disabled && enabledIdx === activeIndex
              return (
                <button
                  key={option.value || '__empty'}
                  id={`${reactId}-option-${option.value}`}
                  type="button"
                  role="option"
                  disabled={option.disabled}
                  aria-selected={isSelected}
                  data-active={isActive || undefined}
                  className={cx('kf-select__option', isSelected && 'is-selected', isActive && 'is-active')}
                  onMouseEnter={() => {
                    if (!option.disabled && enabledIdx >= 0) setActiveIndex(enabledIdx)
                  }}
                  onClick={() => {
                    if (!option.disabled) pick(option.value)
                  }}
                >
                  <span className="kf-select__option-label">{option.label}</span>
                  {isSelected ? <Check className="kf-select__check" size={14} aria-hidden /> : null}
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
