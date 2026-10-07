import type { HTMLAttributes } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cx } from '../utils/cx'
import { Button } from './Button'

export type PaginationProps = HTMLAttributes<HTMLElement> & {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  prevLabel?: string
  nextLabel?: string
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  prevLabel = 'Previous page',
  nextLabel = 'Next page',
  className,
  ...props
}: PaginationProps) {
  const safeCount = Math.max(1, pageCount)
  const safePage = Math.min(Math.max(1, page), safeCount)
  return (
    <nav aria-label="Pagination" className={cx('kf-pagination', className)} {...props}>
      <Button
        variant="ghost"
        size="sm"
        iconOnly
        aria-label={prevLabel}
        disabled={safePage <= 1}
        onClick={() => onPageChange(safePage - 1)}
      >
        <ChevronLeft />
      </Button>
      <span className="kf-pagination__label">
        {safePage} / {safeCount}
      </span>
      <Button
        variant="ghost"
        size="sm"
        iconOnly
        aria-label={nextLabel}
        disabled={safePage >= safeCount}
        onClick={() => onPageChange(safePage + 1)}
      >
        <ChevronRight />
      </Button>
    </nav>
  )
}
