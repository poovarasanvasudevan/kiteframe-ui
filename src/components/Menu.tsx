import {
  createContext,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { useControllableState } from '../hooks/useControllableState'
import { cx } from '../utils/cx'

export type MenuSide = 'top' | 'bottom' | 'left' | 'right'

type MenuContextValue = {
  close: () => void
}

const MenuContext = createContext<MenuContextValue | null>(null)

function useMenuContext() {
  return useContext(MenuContext)
}

export type MenuProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  side?: MenuSide
  align?: 'start' | 'center' | 'end'
  trigger: ReactNode
  children: ReactNode
  className?: string
  contentClassName?: string
  /** Accessible label for the menu panel. */
  label?: string
}

/** Action menu anchored to a trigger. Closes on Escape, outside click, or item select. */
export function Menu({
  open,
  defaultOpen = false,
  onOpenChange,
  side = 'bottom',
  align = 'start',
  trigger,
  children,
  className,
  contentClassName,
  label = 'Menu',
}: MenuProps) {
  const [isOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const ctx = useMemo(() => ({ close: () => setOpen(false) }), [setOpen])

  useEffect(() => {
    if (!isOpen) return
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
  }, [isOpen, setOpen])

  return (
    <MenuContext.Provider value={ctx}>
      <div ref={rootRef} className={cx('kf-menu', className)}>
        <span
          className="kf-menu__trigger"
          onClick={() => setOpen(!isOpen)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
              event.preventDefault()
              setOpen(true)
            }
          }}
          role="button"
          tabIndex={0}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-controls={menuId}
        >
          {trigger}
        </span>
        {isOpen ? (
          <div
            id={menuId}
            role="menu"
            aria-label={label}
            data-side={side}
            data-align={align}
            className={cx('kf-menu__content', contentClassName)}
          >
            {children}
          </div>
        ) : null}
      </div>
    </MenuContext.Provider>
  )
}

export type MenuItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  destructive?: boolean
  /** Closes the parent menu after click. Defaults to true. */
  closeOnSelect?: boolean
}

export function MenuItem({
  className,
  destructive,
  closeOnSelect = true,
  onClick,
  children,
  ...props
}: MenuItemProps) {
  const menu = useMenuContext()
  return (
    <button
      type="button"
      role="menuitem"
      className={cx('kf-menu__item', destructive && 'kf-menu__item--destructive', className)}
      onClick={(event) => {
        onClick?.(event)
        if (closeOnSelect && !event.defaultPrevented) menu?.close()
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export type IconMenuItemProps = MenuItemProps & {
  icon: ReactNode
}

/** Menu row with a leading icon. */
export function IconMenuItem({ icon, className, children, ...props }: IconMenuItemProps) {
  return (
    <MenuItem className={cx('kf-menu__item--icon', className)} {...props}>
      <span className="kf-menu__icon" aria-hidden>
        {icon}
      </span>
      <span className="kf-menu__item-label">{children}</span>
    </MenuItem>
  )
}

export function MenuSeparator({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div role="separator" className={cx('kf-menu__separator', className)} {...props} />
}

export function MenuLabel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('kf-menu__heading', className)} {...props} />
}
