import { useState, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from 'react'
import { MoreVertical } from 'lucide-react'
import { cx } from '../utils/cx'

export type SidebarProps = ComponentPropsWithoutRef<'aside'> & {
  open?: boolean
  brand?: ReactNode
  brandLabel?: string
  footer?: ReactNode
}

export function Sidebar({ open = false, brand, brandLabel, footer, className, children, ...props }: SidebarProps) {
  return (
    <aside className={cx('kf-sidebar', className)} data-open={open || undefined} {...props}>
      <div className="kf-sidebar__brand">
        {brand ?? <span className="kf-sidebar__mark">k</span>}
        {brandLabel ? <span className="kf-sidebar__brand-label">{brandLabel}</span> : null}
      </div>
      <nav className="kf-sidebar__nav" aria-label="Primary navigation">
        {children}
      </nav>
      {footer ? <div className="kf-sidebar__footer">{footer}</div> : null}
    </aside>
  )
}

type SidebarItemOwnProps<E extends ElementType> = {
  as?: E
  active?: boolean
  icon: ReactNode
  label: string
  className?: string
  submenu?: ReactNode
  defaultSubmenuOpen?: boolean
  onSubmenuOpenChange?: (open: boolean) => void
}

export type SidebarItemProps<E extends ElementType = 'a'> = SidebarItemOwnProps<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof SidebarItemOwnProps<E>>

export function SidebarItem<E extends ElementType = 'a'>({
  as,
  active,
  icon,
  label,
  className,
  submenu,
  defaultSubmenuOpen = false,
  onSubmenuOpenChange,
  onClick,
  ...props
}: SidebarItemProps<E>) {
  const Comp = as ?? 'a'
  const [submenuOpen, setSubmenuOpen] = useState(defaultSubmenuOpen)
  const hasSubmenu = submenu != null

  const toggleSubmenu = () => {
    if (!hasSubmenu) return
    const next = !submenuOpen
    setSubmenuOpen(next)
    onSubmenuOpenChange?.(next)
  }

  return (
    <div className={cx('kf-sidebar__item-wrap', hasSubmenu && 'kf-sidebar__item-wrap--submenu')}>
      <Comp
        title={label}
        data-active={active || undefined}
        className={cx('kf-sidebar__item', className)}
        aria-expanded={hasSubmenu ? submenuOpen : undefined}
        aria-haspopup={hasSubmenu ? 'menu' : undefined}
        onClick={(event) => {
          if (hasSubmenu) {
            event.preventDefault()
            toggleSubmenu()
          }
          onClick?.(event)
        }}
        {...props}
      >
        {icon}
        <span className="kf-sidebar__label">{label}</span>
        {hasSubmenu ? <MoreVertical className="kf-sidebar__submenu-indicator" aria-hidden /> : null}
      </Comp>
      {hasSubmenu && submenuOpen ? <div className="kf-sidebar__submenu">{submenu}</div> : null}
    </div>
  )
}

export type SidebarSubmenuProps = ComponentPropsWithoutRef<'div'> & {
  label?: string
}

export function SidebarSubmenu({ label = 'Submenu', className, children, ...props }: SidebarSubmenuProps) {
  return (
    <div role="menu" aria-label={label} className={cx('kf-sidebar__submenu-panel', className)} {...props}>
      {children}
    </div>
  )
}

export type SidebarSubmenuItemProps = ComponentPropsWithoutRef<'a'> & {
  icon: ReactNode
  label: string
}

export function SidebarSubmenuItem({ icon, label, className, children, ...props }: SidebarSubmenuItemProps) {
  return (
    <a role="menuitem" className={cx('kf-sidebar__submenu-item', className)} {...props}>
      <span className="kf-sidebar__submenu-item-icon" aria-hidden>
        {icon}
      </span>
      <span>{children ?? label}</span>
    </a>
  )
}

export type SidebarFooterButtonProps = ComponentPropsWithoutRef<'button'> & {
  label: string
  icon: ReactNode
}

export function SidebarFooterButton({ label, icon, className, ...props }: SidebarFooterButtonProps) {
  return (
    <button type="button" title={label} aria-label={label} className={cx('kf-sidebar__footer-btn', className)} {...props}>
      {icon}
    </button>
  )
}
