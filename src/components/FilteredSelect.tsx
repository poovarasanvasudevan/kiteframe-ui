import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { Check, ChevronDown, Search } from 'lucide-react'
import { useControllableState } from '../hooks/useControllableState'
import { cx } from '../utils/cx'
import type { SelectOption } from './Select'

export type FilteredSelectOption = SelectOption & {
  icon?: ReactNode
  description?: string
  keywords?: string
}

export type FilteredSelectProps = {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  options?: FilteredSelectOption[]
  placeholder?: string
  filterPlaceholder?: string
  emptyMessage?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  className?: string
  id?: string
  name?: string
  'aria-label'?: string
}

/** Select with an inline search field that filters options as you type. */
export function FilteredSelect({
  label,
  hint,
  error,
  options = [],
  placeholder = 'Choose…',
  filterPlaceholder = 'Search…',
  emptyMessage = 'No matches',
  value,
  defaultValue = '',
  onValueChange,
  disabled,
  className,
  id,
  name,
  'aria-label': ariaLabel,
}: FilteredSelectProps) {
  const reactId = useId()
  const listboxId = `${reactId}-listbox`
  const filterId = `${reactId}-filter`
  const fieldId = id ?? name ?? `${reactId}-trigger`
  const rootRef = useRef<HTMLDivElement>(null)
  const filterRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [selected, setSelected] = useControllableState({
    value,
    defaultValue,
    onChange: onValueChange,
  })

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter((option) => {
      const haystack = `${option.label} ${option.description ?? ''} ${option.keywords ?? ''} ${option.value}`.toLowerCase()
      return haystack.includes(q)
    })
  }, [options, query])

  const enabledOptions = useMemo(() => filtered.filter((option) => !option.disabled), [filtered])
  const selectedOption = options.find((option) => option.value === selected)
  const displayLabel = selectedOption?.label

  useEffect(() => {
    if (!open) {
      setQuery('')
      return
    }
    const selectedIdx = enabledOptions.findIndex((option) => option.value === selected)
    setActiveIndex(selectedIdx >= 0 ? selectedIdx : 0)
    const timer = window.setTimeout(() => filterRef.current?.focus(), 0)
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, enabledOptions, selected])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const pick = (next: string) => {
    setSelected(next)
    setOpen(false)
  }

  const onListKeyDown = (event: KeyboardEvent<HTMLDivElement | HTMLInputElement>) => {
    if (!enabledOptions.length) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
      }
      return
    }
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
    } else if (event.key === 'Enter') {
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
      className={cx('kf-field', Boolean(error) && 'kf-field--error', 'kf-select', 'kf-filtered-select', className)}
    >
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
        onKeyDown={(event) => {
          if (disabled) return
          if (
            event.key === 'ArrowDown' ||
            event.key === 'ArrowUp' ||
            event.key === 'Enter' ||
            event.key === ' '
          ) {
            event.preventDefault()
            setOpen(true)
          }
        }}
      >
        <span className="kf-select__value">
          {selectedOption?.icon ? (
            <span className="kf-filtered-select__value-icon" aria-hidden>
              {selectedOption.icon}
            </span>
          ) : null}
          {displayLabel ?? placeholder}
        </span>
        <ChevronDown className="kf-select__chevron" size={14} aria-hidden />
      </button>
      {open ? (
        <div className="kf-select__menu kf-filtered-select__menu" role="presentation">
          <label className="kf-filtered-select__filter" htmlFor={filterId}>
            <Search size={14} aria-hidden />
            <input
              ref={filterRef}
              id={filterId}
              type="search"
              className="kf-filtered-select__input"
              placeholder={filterPlaceholder}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={onListKeyDown}
              autoComplete="off"
            />
          </label>
          <div
            id={listboxId}
            className="kf-filtered-select__list"
            role="listbox"
            tabIndex={-1}
            aria-activedescendant={
              activeIndex >= 0 ? `${reactId}-option-${enabledOptions[activeIndex]?.value}` : undefined
            }
            onKeyDown={onListKeyDown}
          >
            {filtered.length === 0 ? (
              <div className="kf-select__empty">{emptyMessage}</div>
            ) : (
              filtered.map((option) => {
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
                    className={cx(
                      'kf-select__option',
                      'kf-filtered-select__option',
                      isSelected && 'is-selected',
                      isActive && 'is-active',
                    )}
                    onMouseEnter={() => {
                      if (!option.disabled && enabledIdx >= 0) setActiveIndex(enabledIdx)
                    }}
                    onClick={() => {
                      if (!option.disabled) pick(option.value)
                    }}
                  >
                    {option.icon ? (
                      <span className="kf-filtered-select__option-icon" aria-hidden>
                        {option.icon}
                      </span>
                    ) : null}
                    <span className="kf-filtered-select__option-text">
                      <span className="kf-select__option-label">{option.label}</span>
                      {option.description ? (
                        <span className="kf-filtered-select__option-desc">{option.description}</span>
                      ) : null}
                    </span>
                    {isSelected ? <Check className="kf-select__check" size={14} aria-hidden /> : null}
                  </button>
                )
              })
            )}
          </div>
        </div>
      ) : null}
      {error ? (
        <span className="kf-field__error">{error}</span>
      ) : hint ? (
        <span className="kf-field__hint">{hint}</span>
      ) : null}
    </div>
  )
}
