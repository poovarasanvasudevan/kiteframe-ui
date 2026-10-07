import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../utils/cx'

export type TopBarProps = HTMLAttributes<HTMLElement> & {
  title?: ReactNode
  leading?: ReactNode
  actions?: ReactNode
  trailing?: ReactNode
}

/** App header chrome: title / breadcrumbs on the left, utilities on the right. */
export function TopBar({ title, leading, actions, trailing, className, children, ...props }: TopBarProps) {
  return (
    <header className={cx('kf-topbar', className)} {...props}>
      <div className="kf-topbar__leading">
        {leading}
        {title ? <div className="kf-topbar__title">{title}</div> : null}
      </div>
      {children ? <div className="kf-topbar__center">{children}</div> : null}
      <div className="kf-topbar__trailing">
        {actions}
        {trailing}
      </div>
    </header>
  )
}
