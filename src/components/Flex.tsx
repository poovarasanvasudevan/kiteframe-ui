import { forwardRef, type HTMLAttributes } from 'react'
import { cx } from '../utils/cx'

/** Spacing / column scale used by `Flex` and `Grid` (0–12). */
export type LayoutScale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse'
export type FlexWrap = boolean | 'wrap' | 'nowrap' | 'wrap-reverse'

export type FlexProps = HTMLAttributes<HTMLDivElement> & {
  gap?: LayoutScale
  gapX?: LayoutScale
  gapY?: LayoutScale
  direction?: FlexDirection
  align?: FlexAlign
  justify?: FlexJustify
  wrap?: FlexWrap
  /** `inline-flex` instead of `flex`. */
  inline?: boolean
}

function wrapValue(wrap: FlexWrap | undefined) {
  if (wrap === undefined) return undefined
  if (wrap === true) return 'wrap'
  if (wrap === false) return 'nowrap'
  return wrap
}

/** Flexbox layout helper. `gap` / `gapX` / `gapY` use the 0–12 scale. */
export const Flex = forwardRef<HTMLDivElement, FlexProps>(function Flex(
  {
    gap,
    gapX,
    gapY,
    direction = 'row',
    align,
    justify,
    wrap,
    inline = false,
    className,
    style,
    ...props
  },
  ref,
) {
  const resolvedWrap = wrapValue(wrap)
  return (
    <div
      ref={ref}
      className={cx(
        'kf-flex',
        inline && 'kf-flex--inline',
        direction !== 'row' && `kf-flex--${direction}`,
        align && `kf-flex--align-${align}`,
        justify && `kf-flex--justify-${justify}`,
        resolvedWrap && `kf-flex--${resolvedWrap}`,
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
