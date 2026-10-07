import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { cx } from '../utils/cx'

export type ListItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode
  title: ReactNode
  description?: ReactNode
  active?: boolean
  count?: ReactNode
  showChevron?: boolean
  trailing?: ReactNode
}

/**
 * Selectable list row for accounts, portals, requests, etc.
 * Active state uses a light blue wash for selected account pickers.
 */
export function ListItem({
  icon,
  title,
  description,
  active,
  count,
  showChevron = true,
  trailing,
  className,
  type = 'button',
  ...props
}: ListItemProps) {
  return (
    <button
      type={type}
      data-active={active || undefined}
      className={cx('kf-list-item', active && 'kf-list-item--active', className)}
      {...props}
    >
      {icon ? <span className="kf-list-item__icon">{icon}</span> : null}
      <span className="kf-list-item__text">
        <span className="kf-list-item__title">{title}</span>
        {description ? <span className="kf-list-item__desc">{description}</span> : null}
      </span>
      {trailing}
      {count != null ? <span className="kf-list-item__count">{count}</span> : null}
      {showChevron ? (
        <span className="kf-list-item__chevron" aria-hidden>
          <ChevronRight />
        </span>
      ) : null}
    </button>
  )
}
