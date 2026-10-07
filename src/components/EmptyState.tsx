import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../utils/cx'

export type EmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  icon?: ReactNode
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
}

export function EmptyState({ icon, title, description, actions, className, ...props }: EmptyStateProps) {
  return (
    <div className={cx('kf-empty', className)} {...props}>
      {icon ? <div className="kf-empty__icon">{icon}</div> : null}
      <h3 className="kf-empty__title">{title}</h3>
      {description ? <p className="kf-empty__desc">{description}</p> : null}
      {actions ? <div className="kf-empty__actions">{actions}</div> : null}
    </div>
  )
}
