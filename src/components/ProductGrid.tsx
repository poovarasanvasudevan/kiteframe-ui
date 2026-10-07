import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { ExternalLink } from 'lucide-react'
import { cx } from '../utils/cx'

export type ProductTileProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  icon: ReactNode
  label: ReactNode
  color?: string
}

export function ProductTile({ icon, label, color, className, ...props }: ProductTileProps) {
  return (
    <a className={cx('kf-product-tile', className)} {...props}>
      <span className="kf-product-tile__icon" style={color ? { background: color } : undefined}>
        {icon}
      </span>
      <span className="kf-product-tile__label">{label}</span>
    </a>
  )
}

export type ProductGridProps = HTMLAttributes<HTMLDivElement> & {
  title?: ReactNode
  externalHref?: string
  externalLabel?: string
  children: ReactNode
}

/** Horizontal/grid of product icons with labels (Explore KiteFrame products). */
export function ProductGrid({
  title,
  externalHref,
  externalLabel = 'Open in new window',
  className,
  children,
  ...props
}: ProductGridProps) {
  return (
    <section className={cx('kf-product-grid', className)} {...props}>
      {(title || externalHref) && (
        <div className="kf-product-grid__header">
          {title ? <h3 className="kf-product-grid__title">{title}</h3> : null}
          {externalHref ? (
            <a className="kf-product-grid__ext" href={externalHref} target="_blank" rel="noreferrer" aria-label={externalLabel}>
              <ExternalLink />
            </a>
          ) : null}
        </div>
      )}
      <div className="kf-product-grid__items">{children}</div>
    </section>
  )
}
