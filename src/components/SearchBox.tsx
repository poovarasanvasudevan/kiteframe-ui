import { forwardRef, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode } from 'react'
import { Search } from 'lucide-react'
import { cx } from '../utils/cx'

export type SearchBoxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  shortcut?: ReactNode
  className?: string
}

export const SearchBox = forwardRef<HTMLInputElement, SearchBoxProps>(function SearchBox(
  { className, shortcut, ...props },
  ref,
) {
  return (
    <label className={cx('kf-search', className)}>
      <span className="kf-search__icon" aria-hidden>
        <Search size={14} strokeWidth={1.75} />
      </span>
      <input ref={ref} className="kf-search__input" type="search" {...props} />
      {shortcut ? <kbd className="kf-search__kbd">{shortcut}</kbd> : null}
    </label>
  )
})

export type SearchTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  placeholder?: string
  shortcut?: ReactNode
}

export const SearchTrigger = forwardRef<HTMLButtonElement, SearchTriggerProps>(function SearchTrigger(
  { className, placeholder = 'Search…', shortcut = '⌘ K', ...props },
  ref,
) {
  return (
    <button ref={ref} type="button" className={cx('kf-search', 'kf-search--button', className)} {...props}>
      <span className="kf-search__icon" aria-hidden>
        <Search size={14} strokeWidth={1.75} />
      </span>
      <span className="kf-search__placeholder">{placeholder}</span>
      {shortcut ? <kbd className="kf-search__kbd">{shortcut}</kbd> : null}
    </button>
  )
})
