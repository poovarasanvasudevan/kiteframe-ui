import type { HTMLAttributes, ReactNode } from 'react'
import { CircleHelp } from 'lucide-react'
import { cx } from '../utils/cx'
import { Link } from './Link'

export type PageHeaderProps = HTMLAttributes<HTMLDivElement> & {
  title: ReactNode
  description?: ReactNode
  helpHref?: string
  helpLabel?: string
  actions?: ReactNode
  breadcrumbs?: ReactNode
}

/** Page title block with optional help link, description, and actions. */
export function PageHeader({
  title,
  description,
  helpHref,
  helpLabel = 'Help',
  actions,
  breadcrumbs,
  className,
  children,
  ...props
}: PageHeaderProps) {
  return (
    <header className={cx('kf-page-header', className)} {...props}>
      {breadcrumbs ? <div className="kf-page-header__crumbs">{breadcrumbs}</div> : null}
      <div className="kf-page-header__row">
        <div className="kf-page-header__titles">
          <h1 className="kf-page-header__title">
            {title}
            {helpHref ? (
              <Link href={helpHref} className="kf-page-header__help" aria-label={helpLabel} title={helpLabel}>
                <CircleHelp />
              </Link>
            ) : null}
          </h1>
          {description ? <p className="kf-page-header__desc">{description}</p> : null}
        </div>
        {actions ? <div className="kf-page-header__actions">{actions}</div> : null}
      </div>
      {children}
    </header>
  )
}
