import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { useControllableState } from '../hooks/useControllableState'
import { cx } from '../utils/cx'

export type DateRange = {
  start: string
  end: string
}

export type DateRangePickerProps = {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  value?: DateRange
  defaultValue?: DateRange
  onValueChange?: (value: DateRange) => void
  placeholder?: string
  min?: string
  max?: string
  disabled?: boolean
  clearable?: boolean
  /** Show one or two month grids. Default `2`. */
  numberOfMonths?: 1 | 2
  name?: string
  nameStart?: string
  nameEnd?: string
  id?: string
  className?: string
}

const weekdayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const emptyRange: DateRange = { start: '', end: '' }

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

function formatDay(value: string) {
  if (!value) return ''
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(parseDate(value))
}

function displayRange(range: DateRange) {
  if (!range.start && !range.end) return ''
  if (range.start && !range.end) return `${formatDay(range.start)} – …`
  if (!range.start && range.end) return `… – ${formatDay(range.end)}`
  return `${formatDay(range.start)} – ${formatDay(range.end)}`
}

function orderedRange(a: string, b: string): DateRange {
  return a <= b ? { start: a, end: b } : { start: b, end: a }
}

function monthKey(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}`
}

function addMonths(date: Date, count: number) {
  return new Date(date.getFullYear(), date.getMonth() + count, 1)
}

function buildDays(viewDate: Date) {
  const start = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1)
  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(viewDate.getFullYear(), viewDate.getMonth(), index - start.getDay() + 1)
    return { day, currentMonth: day.getMonth() === viewDate.getMonth() }
  })
}

/** Dual-date calendar for selecting a start → end range (`YYYY-MM-DD`). */
export function DateRangePicker({
  label,
  hint,
  error,
  value,
  defaultValue = emptyRange,
  onValueChange,
  placeholder = 'Select date range…',
  min,
  max,
  disabled,
  clearable = false,
  numberOfMonths = 2,
  name,
  nameStart,
  nameEnd,
  id,
  className,
}: DateRangePickerProps) {
  const reactId = useId()
  const fieldId = id ?? name ?? `${reactId}-trigger`
  const rootRef = useRef<HTMLDivElement>(null)
  const [range, setRange] = useControllableState({
    value,
    defaultValue,
    onChange: onValueChange,
  })
  const [open, setOpen] = useState(false)
  const [draftStart, setDraftStart] = useState<string | null>(null)
  const [hoverDate, setHoverDate] = useState<string | null>(null)
  const [viewDate, setViewDate] = useState(() => parseDate(range.start || range.end || undefined))

  const preview = useMemo(() => {
    if (draftStart && hoverDate) return orderedRange(draftStart, hoverDate)
    if (draftStart) return { start: draftStart, end: '' }
    return range
  }, [draftStart, hoverDate, range])

  useEffect(() => {
    if (!open) return
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
        setDraftStart(null)
        setHoverDate(null)
      }
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        setDraftStart(null)
        setHoverDate(null)
      }
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const isDisabledDay = (next: string) => Boolean((min && next < min) || (max && next > max))

  const pickDay = (next: string) => {
    if (isDisabledDay(next)) return
    if (!draftStart) {
      setDraftStart(next)
      setHoverDate(null)
      return
    }
    const nextRange = orderedRange(draftStart, next)
    setRange(nextRange)
    setDraftStart(null)
    setHoverDate(null)
    setOpen(false)
  }

  const clear = () => {
    setRange(emptyRange)
    setDraftStart(null)
    setHoverDate(null)
  }

  const months = useMemo(() => {
    return Array.from({ length: numberOfMonths }, (_, index) => addMonths(viewDate, index))
  }, [numberOfMonths, viewDate])

  const dayClass = (nextDate: string) => {
    const { start, end } = preview
    const isStart = Boolean(start && nextDate === start)
    const isEnd = Boolean(end && nextDate === end)
    const inRange = Boolean(start && end && nextDate > start && nextDate < end)
    const isSelected = isStart || isEnd || (start && !end && nextDate === start)
    return cx(
      'kf-datepicker__day',
      inRange && 'kf-datepicker__day--in-range',
      isStart && 'kf-datepicker__day--range-start',
      isEnd && 'kf-datepicker__day--range-end',
      isSelected && 'is-selected',
    )
  }

  const renderMonth = (monthDate: Date, showPrev: boolean, showNext: boolean) => {
    const days = buildDays(monthDate)
    return (
      <div key={monthKey(monthDate)} className="kf-datepicker__month-panel">
        <div className="kf-datepicker__header">
          {showPrev ? (
            <button
              type="button"
              className="kf-datepicker__nav"
              aria-label="Previous month"
              onClick={() => setViewDate(addMonths(viewDate, -1))}
            >
              <ChevronLeft size={15} />
            </button>
          ) : (
            <span className="kf-datepicker__nav-spacer" />
          )}
          <strong>
            {new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' }).format(monthDate)}
          </strong>
          {showNext ? (
            <button
              type="button"
              className="kf-datepicker__nav"
              aria-label="Next month"
              onClick={() => setViewDate(addMonths(viewDate, 1))}
            >
              <ChevronRight size={15} />
            </button>
          ) : (
            <span className="kf-datepicker__nav-spacer" />
          )}
        </div>
        <div className="kf-datepicker__weekdays">
          {weekdayLabels.map((day) => (
            <span key={`${monthKey(monthDate)}-${day}`}>{day}</span>
          ))}
        </div>
        <div className="kf-datepicker__grid">
          {days.map(({ day, currentMonth }) => {
            const nextDate = dateValue(day)
            return (
              <button
                key={`${monthKey(monthDate)}-${nextDate}`}
                type="button"
                className={cx(dayClass(nextDate), !currentMonth && 'kf-datepicker__day--muted')}
                disabled={isDisabledDay(nextDate)}
                onClick={() => pickDay(nextDate)}
                onMouseEnter={() => {
                  if (draftStart) setHoverDate(nextDate)
                }}
                onMouseLeave={() => {
                  if (draftStart) setHoverDate(null)
                }}
              >
                {day.getDate()}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const hasValue = Boolean(range.start || range.end || draftStart)

  return (
    <div
      ref={rootRef}
      className={cx('kf-field', 'kf-datepicker', 'kf-daterange', Boolean(error) && 'kf-field--error', className)}
    >
      {label ? (
        <label className="kf-field__label" htmlFor={fieldId}>
          {label}
        </label>
      ) : null}
      {nameStart || name ? (
        <input type="hidden" name={nameStart ?? `${name}-start`} value={range.start} />
      ) : null}
      {nameEnd || name ? (
        <input type="hidden" name={nameEnd ?? `${name}-end`} value={range.end} />
      ) : null}
      <button
        id={fieldId}
        type="button"
        className={cx('kf-select__trigger', !hasValue && 'kf-select__trigger--placeholder')}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          setViewDate(parseDate(range.start || range.end || undefined))
          setDraftStart(null)
          setHoverDate(null)
          setOpen((current) => !current)
        }}
      >
        <span className="kf-select__value">
          {draftStart && !range.end
            ? displayRange({ start: draftStart, end: hoverDate ?? '' }) || placeholder
            : displayRange(range) || placeholder}
        </span>
        <CalendarDays className="kf-select__chevron" size={14} aria-hidden />
      </button>
      {open ? (
        <div
          className={cx(
            'kf-datepicker__panel',
            'kf-daterange__panel',
            numberOfMonths === 2 && 'kf-daterange__panel--dual',
          )}
          role="dialog"
          aria-label={label ? String(label) : 'Date range picker'}
        >
          <div className="kf-daterange__months">
            {months.map((monthDate, index) =>
              renderMonth(
                monthDate,
                index === 0,
                index === months.length - 1,
              ),
            )}
          </div>
          <div className="kf-daterange__footer">
            <span className="kf-daterange__hint">
              {draftStart ? 'Select end date' : 'Select start date'}
            </span>
            {clearable && hasValue ? (
              <button type="button" className="kf-datepicker__clear kf-daterange__clear" onClick={clear}>
                Clear
              </button>
            ) : null}
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
