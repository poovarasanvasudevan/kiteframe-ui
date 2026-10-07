import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
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
}

export type SidebarItemProps<E extends ElementType = 'a'> = SidebarItemOwnProps<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof SidebarItemOwnProps<E>>

export function SidebarItem<E extends ElementType = 'a'>({
  as,
  active,
  icon,
  label,
  className,
  ...props
}: SidebarItemProps<E>) {
  const Comp = as ?? 'a'
  return (
    <Comp
      title={label}
      data-active={active || undefined}
      className={cx('kf-sidebar__item', className)}
      {...props}
    >
      {icon}
      <span className="kf-sidebar__label">{label}</span>
    </Comp>
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
