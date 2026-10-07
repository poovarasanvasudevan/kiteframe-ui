import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { BookOpen } from 'lucide-react'
import { cx } from '../utils/cx'

export type HelpListItemProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  icon?: ReactNode
  children: ReactNode
}

export function HelpListItem({ icon, className, children, ...props }: HelpListItemProps) {
  return (
    <a className={cx('kf-help-list__item', className)} {...props}>
      <span className="kf-help-list__icon" aria-hidden>
        {icon ?? <BookOpen />}
      </span>
      <span>{children}</span>
    </a>
  )
}

export type HelpListProps = HTMLAttributes<HTMLElement> & {
  title?: ReactNode
  children: ReactNode
}

/** Right-panel help article links with icons. */
export function HelpList({ title, className, children, ...props }: HelpListProps) {
  return (
    <section className={cx('kf-help-list', className)} {...props}>
      {title ? <h3 className="kf-help-list__title">{title}</h3> : null}
      <div className="kf-help-list__items">{children}</div>
    </section>
  )
}

export type InfoPanelProps = HTMLAttributes<HTMLElement> & {
  title?: ReactNode
  children: ReactNode
}

/** About / help side panel container. */
export function InfoPanel({ title, className, children, ...props }: InfoPanelProps) {
  return (
    <aside className={cx('kf-info-panel', className)} {...props}>
      {title ? <h2 className="kf-info-panel__title">{title}</h2> : null}
      <div className="kf-info-panel__body">{children}</div>
    </aside>
  )
}
