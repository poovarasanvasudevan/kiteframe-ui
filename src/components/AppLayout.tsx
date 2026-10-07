import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../utils/cx'

export type AppLayoutProps = HTMLAttributes<HTMLDivElement> & {
  sidebar?: ReactNode
  topbar?: ReactNode
  aside?: ReactNode
  children?: ReactNode
}

/**
 * Shell layout: icon rail + top bar + main work surface + optional right panel.
 * Compose with Sidebar, TopBar, Card, etc.
 */
export function AppLayout({ sidebar, topbar, aside, className, children, ...props }: AppLayoutProps) {
  return (
    <div
      className={cx(
        'kf-layout',
        sidebar ? 'kf-layout--with-sidebar' : 'kf-layout--no-sidebar',
        aside ? 'kf-layout--with-aside' : undefined,
        className,
      )}
      {...props}
    >
      {sidebar ? <div className="kf-layout__rail">{sidebar}</div> : null}
      <div className="kf-layout__main">
        {topbar}
        <div className="kf-layout__body">
          <main className="kf-layout__content">{children}</main>
          {aside ? <aside className="kf-layout__aside">{aside}</aside> : null}
        </div>
      </div>
    </div>
  )
}
