import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight, Clock3 } from 'lucide-react'
import { useControllableState } from '../hooks/useControllableState'
import { cx } from '../utils/cx'

export type DatePickerMode = 'date' | 'week' | 'month' | 'time' | 'datetime'

export type DatePickerProps = {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  mode?: DatePickerMode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  min?: string
  max?: string
  disabled?: boolean
  clearable?: boolean
  name?: string
  id?: string
  className?: string
}

const weekdayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const monthLabels = Array.from({ length: 12 }, (_, month) =>
  new Intl.DateTimeFormat(undefined, { month: 'short' }).format(new Date(2020, month, 1)),
)

function pad(value: number) {
  return String(value).padStart(2, '0')
}

function dateValue(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function parseDate(value?: string) {
  if (!value) return new Date()
  const [year, month, day] = value.slice(0, 10).split('-').map(Number)
  return year && month ? new Date(year, month - 1, day || 1) : new Date()
}

function weekValue(date: Date) {
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const day = target.getDay() || 7
  target.setDate(target.getDate() + 4 - day)
  const yearStart = new Date(target.getFullYear(), 0, 1)
  const week = Math.ceil(((target.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
  return `${target.getFullYear()}-W${pad(week)}`
}

function displayValue(value: string, mode: DatePickerMode) {
  if (!value) return ''
  if (mode === 'time') return value
  if (mode === 'week') return value.replace('-', ' · ')
  if (mode === 'month') {
    const [year, month] = value.split('-').map(Number)
    return `${monthLabels[(month || 1) - 1]} ${year}`
  }
  const date = parseDate(value)
  const dateLabel = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(date)
  return mode === 'datetime' ? `${dateLabel}, ${value.slice(11, 16) || '00:00'}` : dateLabel
}

export function DatePicker({
  label,
  hint,
  error,
  mode = 'date',
  value,
  defaultValue = '',
  onValueChange,
  placeholder,
  min,
  max,
  disabled,
  clearable = false,
  name,
  id,
  className,
}: DatePickerProps) {
  const reactId = useId()
  const fieldId = id ?? name ?? `${reactId}-trigger`
  const rootRef = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useControllableState({ value, defaultValue, onChange: onValueChange })
  const [open, setOpen] = useState(false)
  const initial = parseDate(selected || undefined)
  const [viewDate, setViewDate] = useState(initial)

  useEffect(() => {
    if (!open) return
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const pick = (next: string) => {
    setSelected(next)
    setOpen(false)
  }

  const isDisabled = (next: string) => Boolean((min && next < min) || (max && next > max))
  const days = useMemo(() => {
    const start = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1)
    return Array.from({ length: 42 }, (_, index) => {
      const day = new Date(viewDate.getFullYear(), viewDate.getMonth(), index - start.getDay() + 1)
      return { day, currentMonth: day.getMonth() === viewDate.getMonth() }
    })
  }, [viewDate])

  const chooseDate = (day: Date) => {
    const nextDate = dateValue(day)
    if (isDisabled(nextDate)) return
    if (mode === 'week') pick(weekValue(day))
    else if (mode === 'datetime') pick(`${nextDate}T${selected.slice(11, 16) || '00:00'}`)
    else pick(nextDate)
  }

  const calendar = (
    <>
      <div className="kf-datepicker__header">
        <button type="button" className="kf-datepicker__nav" aria-label="Previous month" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}>
          <ChevronLeft size={15} />
        </button>
        <strong>{new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' }).format(viewDate)}</strong>
        <button type="button" className="kf-datepicker__nav" aria-label="Next month" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}>
          <ChevronRight size={15} />
        </button>
      </div>
      <div className="kf-datepicker__weekdays">{weekdayLabels.map((day) => <span key={day}>{day}</span>)}</div>
      <div className="kf-datepicker__grid">
        {days.map(({ day, currentMonth }) => {
          const nextDate = dateValue(day)
          const selectedDate = selected.slice(0, 10) === nextDate
          return (
            <button
              key={nextDate}
              type="button"
              className={cx('kf-datepicker__day', !currentMonth && 'kf-datepicker__day--muted', selectedDate && 'is-selected')}
              disabled={isDisabled(nextDate)}
              onClick={() => chooseDate(day)}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>
    </>
  )

  const content = mode === 'month' ? (
    <>
      <div className="kf-datepicker__header">
        <button type="button" className="kf-datepicker__nav" aria-label="Previous year" onClick={() => setViewDate(new Date(viewDate.getFullYear() - 1, viewDate.getMonth(), 1))}><ChevronLeft size={15} /></button>
        <strong>{viewDate.getFullYear()}</strong>
        <button type="button" className="kf-datepicker__nav" aria-label="Next year" onClick={() => setViewDate(new Date(viewDate.getFullYear() + 1, viewDate.getMonth(), 1))}><ChevronRight size={15} /></button>
      </div>
      <div className="kf-datepicker__months">
        {monthLabels.map((month, index) => {
          const next = `${viewDate.getFullYear()}-${pad(index + 1)}`
          return <button key={month} type="button" className={cx('kf-datepicker__month', selected === next && 'is-selected')} onClick={() => pick(next)}>{month}</button>
        })}
      </div>
    </>
  ) : mode === 'time' ? (
    <div className="kf-datepicker__time-panel">
      <label htmlFor={`${fieldId}-time`}>Choose time</label>
      <input id={`${fieldId}-time`} className="kf-datepicker__time-input" type="time" value={selected} onChange={(event) => pick(event.target.value)} autoFocus />
    </div>
  ) : (
    <>{calendar}{mode === 'datetime' ? <div className="kf-datepicker__time-row"><Clock3 size={14} /><input className="kf-datepicker__time-input" type="time" value={selected.slice(11, 16)} onChange={(event) => setSelected(`${selected.slice(0, 10) || dateValue(new Date())}T${event.target.value}`)} /></div> : null}</>
  )

  return (
    <div ref={rootRef} className={cx('kf-field', 'kf-datepicker', Boolean(error) && 'kf-field--error', className)}>
      {label ? <label className="kf-field__label" htmlFor={fieldId}>{label}</label> : null}
      {name ? <input type="hidden" name={name} value={selected} /> : null}
      <button id={fieldId} type="button" className={cx('kf-select__trigger', !selected && 'kf-select__trigger--placeholder')} disabled={disabled} aria-haspopup="dialog" aria-expanded={open} onClick={() => { setViewDate(parseDate(selected || undefined)); setOpen((current) => !current) }}>
        <span className="kf-select__value">{displayValue(selected, mode) || placeholder || (mode === 'time' ? 'Select time…' : 'Select date…')}</span>
        {mode === 'time' ? <Clock3 className="kf-select__chevron" size={14} aria-hidden /> : <CalendarDays className="kf-select__chevron" size={14} aria-hidden />}
      </button>
      {open ? <div className="kf-datepicker__panel" role="dialog" aria-label={label ? String(label) : 'Date picker'}>{content}{clearable && selected ? <button type="button" className="kf-datepicker__clear" onClick={() => pick('')}>Clear</button> : null}</div> : null}
      {error ? <span className="kf-field__error">{error}</span> : hint ? <span className="kf-field__hint">{hint}</span> : null}
    </div>
  )
}
