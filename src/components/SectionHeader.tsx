import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../utils/cx'

export type SectionHeaderProps = HTMLAttributes<HTMLDivElement> & {
  title: ReactNode
  description?: ReactNode
  illustration?: ReactNode
  actions?: ReactNode
}

/** Section title with optional description and right-side illustration. */
export function SectionHeader({
  title,
  description,
  illustration,
  actions,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div className={cx('kf-section-header', className)} {...props}>
      <div className="kf-section-header__text">
        <h2 className="kf-section-header__title">{title}</h2>
        {description ? <p className="kf-section-header__desc">{description}</p> : null}
        {actions ? <div className="kf-section-header__actions">{actions}</div> : null}
      </div>
      {illustration ? <div className="kf-section-header__art">{illustration}</div> : null}
    </div>
  )
}
