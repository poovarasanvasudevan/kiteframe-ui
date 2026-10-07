import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Search } from 'lucide-react'
import { cx } from '../utils/cx'

export type CommandItem = {
  id: string
  label: string
  group?: string
  shortcut?: string
  icon?: ReactNode
  keywords?: string
  onSelect: () => void
}

export type CommandKProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: CommandItem[]
  placeholder?: string
  emptyText?: string
  className?: string
}

function matches(item: CommandItem, query: string) {
  if (!query) return true
  const haystack = `${item.label} ${item.group ?? ''} ${item.keywords ?? ''}`.toLowerCase()
  return haystack.includes(query.toLowerCase())
}

export function CommandK({
  open,
  onOpenChange,
  items,
  placeholder = 'Search commands…',
  emptyText = 'No matching commands.',
  className,
}: CommandKProps) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = useMemo(() => items.filter((item) => matches(item, query)), [items, query])

  const groups = useMemo(() => {
    const map = new Map<string, CommandItem[]>()
    for (const item of filtered) {
      const key = item.group ?? 'Commands'
      const list = map.get(key) ?? []
      list.push(item)
      map.set(key, list)
    }
    return [...map.entries()]
  }, [filtered])

  useEffect(() => {
    if (!open) return
    setQuery('')
    setActive(0)
    const timer = window.setTimeout(() => inputRef.current?.focus(), 0)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = previous
    }
  }, [open])

  useEffect(() => {
    setActive(0)
  }, [query])

  if (!open || typeof document === 'undefined') return null

  const run = (item: CommandItem) => {
    onOpenChange(false)
    item.onSelect()
  }

  return createPortal(
    <div className="kf-dialog-backdrop" onMouseDown={() => onOpenChange(false)}>
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className={cx('kf-command', className)}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="kf-command__input-row">
          <Search aria-hidden />
          <input
            ref={inputRef}
            className="kf-command__input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                event.preventDefault()
                onOpenChange(false)
              }
              if (event.key === 'ArrowDown') {
                event.preventDefault()
                setActive((index) => Math.min(index + 1, Math.max(filtered.length - 1, 0)))
              }
              if (event.key === 'ArrowUp') {
                event.preventDefault()
                setActive((index) => Math.max(index - 1, 0))
              }
              if (event.key === 'Enter' && filtered[active]) {
                event.preventDefault()
                run(filtered[active])
              }
            }}
          />
          <kbd className="kf-search__kbd">ESC</kbd>
        </div>
        <div className="kf-command__list" role="listbox">
          {filtered.length === 0 ? (
            <div className="kf-command__empty">{emptyText}</div>
          ) : (
            groups.map(([group, groupItems]) => {
              let offset = 0
              for (const [name, list] of groups) {
                if (name === group) break
                offset += list.length
              }
              return (
                <div key={group}>
                  <div className="kf-command__group">{group}</div>
                  {groupItems.map((item, index) => {
                    const absolute = offset + index
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="option"
                        aria-selected={absolute === active}
                        data-active={absolute === active || undefined}
                        className="kf-command__item"
                        onMouseEnter={() => setActive(absolute)}
                        onClick={() => run(item)}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                        {item.shortcut ? <span className="kf-command__shortcut">{item.shortcut}</span> : null}
                      </button>
                    )
                  })}
                </div>
              )
            })
          )}
        </div>
      </section>
    </div>,
    document.body,
  )
}

/** Registers ⌘K / Ctrl+K to toggle the command palette. */
export function useCommandKShortcut(onToggle: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        onToggle()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [enabled, onToggle])
}
