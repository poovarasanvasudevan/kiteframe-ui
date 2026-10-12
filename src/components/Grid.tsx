import { forwardRef, type HTMLAttributes } from 'react'
import { cx } from '../utils/cx'
import type { FlexAlign, LayoutScale } from './Flex'

export type GridJustify = 'start' | 'center' | 'end' | 'stretch'
export type GridAlign = FlexAlign

export type GridProps = HTMLAttributes<HTMLDivElement> & {
  /** Column count (1–12). Default `12`. */
  cols?: Exclude<LayoutScale, 0>
  gap?: LayoutScale
  gapX?: LayoutScale
  gapY?: LayoutScale
  align?: GridAlign
  justify?: GridJustify
  /** `inline-grid` instead of `grid`. */
  inline?: boolean
}

/** CSS grid with a 1–12 column track. Pair with `GridItem` for spans. */
export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  {
    cols = 12,
    gap,
    gapX,
    gapY,
    align,
    justify,
    inline = false,
    className,
    style,
    ...props
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(
        'kf-grid',
        inline && 'kf-grid--inline',
        `kf-grid--cols-${cols}`,
        align && `kf-grid--align-${align}`,
        justify && `kf-grid--justify-${justify}`,
        gap != null && `kf-gap-${gap}`,
        gapX != null && `kf-gap-x-${gapX}`,
        gapY != null && `kf-gap-y-${gapY}`,
        className,
      )}
      style={style}
      {...props}
    />
  )
})

export type GridItemProps = HTMLAttributes<HTMLDivElement> & {
  /** Column span (1–12). */
  span?: Exclude<LayoutScale, 0>
  /** Grid column start (1–12). */
  col?: Exclude<LayoutScale, 0>
  /** Row span (1–12). */
  rowSpan?: Exclude<LayoutScale, 0>
  /** Grid row start (1–12). */
  row?: Exclude<LayoutScale, 0>
}

/** Cell inside `Grid`. Use `span` / `col` / `row` / `rowSpan` (1–12). */
export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(function GridItem(
  { span, col, rowSpan, row, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(
        'kf-grid__item',
        span != null && `kf-col-span-${span}`,
        col != null && `kf-col-start-${col}`,
        rowSpan != null && `kf-row-span-${rowSpan}`,
        row != null && `kf-row-start-${row}`,
        className,
      )}
      {...props}
    />
  )
})
