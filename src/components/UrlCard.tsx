import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../utils/cx'

export type UrlCardProps = HTMLAttributes<HTMLDivElement> & {
  label: ReactNode
  url: ReactNode
  action?: ReactNode
  illustration?: ReactNode
}

/** Soft info card showing current org/account URL with an action button. */
export function UrlCard({ label, url, action, illustration, className, ...props }: UrlCardProps) {
  return (
    <div className={cx('kf-url-card', className)} {...props}>
      <div className="kf-url-card__content">
        <div className="kf-url-card__label">{label}</div>
        <div className="kf-url-card__url">{url}</div>
        {action ? <div className="kf-url-card__action">{action}</div> : null}
      </div>
      {illustration ? <div className="kf-url-card__art">{illustration}</div> : null}
    </div>
  )
}
