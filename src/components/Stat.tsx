import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../utils/cx'

export type StatProps = HTMLAttributes<HTMLDivElement> & {
  label: ReactNode
  value: ReactNode
  /** Place label above value (dashboard metric) or below (settings stat). */
  layout?: 'label-top' | 'value-top'
}

/** KPI / metric tile used in dashboard summary bars. */
export function Stat({ label, value, layout = 'label-top', className, ...props }: StatProps) {
  return (
    <div className={cx('kf-stat', `kf-stat--${layout}`, className)} {...props}>
      {layout === 'label-top' ? (
        <>
          <div className="kf-stat__label">{label}</div>
          <div className="kf-stat__value">{value}</div>
        </>
      ) : (
        <>
          <div className="kf-stat__value">{value}</div>
          <div className="kf-stat__label">{label}</div>
        </>
      )}
    </div>
  )
}

export type StatBarProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

/** Horizontal row of Stat tiles with dividers. */
export function StatBar({ className, children, ...props }: StatBarProps) {
  return (
    <div className={cx('kf-stat-bar', className)} {...props}>
      {children}
    </div>
  )
}
