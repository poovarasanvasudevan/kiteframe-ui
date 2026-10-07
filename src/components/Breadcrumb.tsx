import type { HTMLAttributes, ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { cx } from '../utils/cx'

export type BreadcrumbItem = {
  id: string
  label: ReactNode
  href?: string
  onClick?: () => void
  current?: boolean
}

export type BreadcrumbProps = HTMLAttributes<HTMLElement> & {
  items: BreadcrumbItem[]
  separator?: ReactNode
}

/** Path navigation (e.g. Security > Accounts and Portals). */
export function Breadcrumb({ items, separator, className, ...props }: BreadcrumbProps) {
  const sep = separator ?? <ChevronRight aria-hidden />
  return (
    <nav aria-label="Breadcrumb" className={cx('kf-breadcrumb', className)} {...props}>
      <ol className="kf-breadcrumb__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1 || item.current
          return (
            <li key={item.id} className="kf-breadcrumb__item">
              {index > 0 ? <span className="kf-breadcrumb__sep">{sep}</span> : null}
              {isLast ? (
                <span className="kf-breadcrumb__current" aria-current="page">
                  {item.label}
                </span>
              ) : item.href ? (
                <a className="kf-breadcrumb__link" href={item.href} onClick={item.onClick}>
                  {item.label}
                </a>
              ) : (
                <button type="button" className="kf-breadcrumb__link" onClick={item.onClick}>
                  {item.label}
                </button>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
