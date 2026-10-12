import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { useControllableState } from '../hooks/useControllableState'
import { cx } from '../utils/cx'
import { MenuContext } from './Menu'

export type ContextMenuProps = {
  /** Element(s) that receive the right-click. */
  trigger: ReactNode
  /** Menu body — compose with `MenuItem`, `IconMenuItem`, `MenuSeparator`, `MenuLabel`. */
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
  className?: string
  contentClassName?: string
  /** Accessible label for the menu panel. */
  label?: string
}

/**
 * Right-click menu positioned at the pointer.
 * Reuses `MenuItem` / `IconMenuItem` / `MenuSeparator` / `MenuLabel` (same close-on-select behavior as `Menu`).
 */
export function ContextMenu({
  trigger,
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  className,
  contentClassName,
  label = 'Context menu',
}: ContextMenuProps) {
  const [isOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLSpanElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const ctx = useMemo(() => ({ close: () => setOpen(false) }), [setOpen])

  useEffect(() => {
    if (!isOpen) return
    const onPointer = (event: MouseEvent) => {
      const target = event.target as Node
      if (menuRef.current?.contains(target)) return
      if (triggerRef.current?.contains(target) && event.button === 2) return
      setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onScroll = () => setOpen(false)
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('resize', onScroll)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', onScroll)
    }
  }, [isOpen, setOpen])

  useLayoutEffect(() => {
    if (!isOpen || !menuRef.current) return
    const el = menuRef.current
    const rect = el.getBoundingClientRect()
    const pad = 8
    let x = coords.x
    let y = coords.y
    if (x + rect.width > window.innerWidth - pad) x = Math.max(pad, window.innerWidth - rect.width - pad)
    if (y + rect.height > window.innerHeight - pad) y = Math.max(pad, window.innerHeight - rect.height - pad)
    if (x < pad) x = pad
    if (y < pad) y = pad
    el.style.left = `${x}px`
    el.style.top = `${y}px`
  }, [isOpen, coords, children])

  return (
    <MenuContext.Provider value={ctx}>
      <span
        ref={triggerRef}
        className={cx('kf-context-menu', className)}
        onContextMenu={(event) => {
          if (disabled) return
          event.preventDefault()
          event.stopPropagation()
          setCoords({ x: event.clientX, y: event.clientY })
          setOpen(true)
        }}
      >
        {trigger}
      </span>
      {isOpen && typeof document !== 'undefined'
        ? createPortal(
            <div
              ref={menuRef}
              id={menuId}
              role="menu"
              aria-label={label}
              className={cx('kf-menu__content', 'kf-context-menu__content', contentClassName)}
              style={{ left: coords.x, top: coords.y }}
            >
              {children}
            </div>,
            document.body,
          )
        : null}
    </MenuContext.Provider>
  )
}
