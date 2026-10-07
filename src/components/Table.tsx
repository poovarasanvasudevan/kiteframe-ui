import type { HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react'
import { cx } from '../utils/cx'

export type TableProps = TableHTMLAttributes<HTMLTableElement> & {
  compact?: boolean
  wrapClassName?: string
}

export function Table({ compact, className, wrapClassName, ...props }: TableProps) {
  return (
    <div className={cx('kf-table-wrap', wrapClassName)}>
      <table className={cx('kf-table', compact && 'kf-table--compact', className)} {...props} />
    </div>
  )
}

export function THead({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={className} {...props} />
}

export function TBody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={className} {...props} />
}

export function TR({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={className} {...props} />
}

export function TH({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={className} {...props} />
}

export function TD({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={className} {...props} />
}
