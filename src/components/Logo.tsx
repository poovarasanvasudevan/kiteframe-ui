import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '../utils/cx'
import { LOGO_SHAPES, LogoShapeGraphic, type LogoShape } from './logoShapes'

export type { LogoShape }
export { LOGO_SHAPES }

export type LogoSize = 'sm' | 'md' | 'lg'

export type LogoProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'color'> & {
  /** Center glyph (typically a lucide icon or SVG). */
  icon: ReactNode
  /** Fill color for the silhouette. Defaults to brand teal. */
  backgroundColor?: string
  /** Icon color. Defaults to white. */
  iconColor?: string
  /** Outer silhouette. Defaults to `clover`. */
  shape?: LogoShape
  size?: LogoSize
  /** Accessible name. When set, exposed as `img` with `aria-label`. */
  label?: string
}

const sizePx: Record<LogoSize, number> = {
  sm: 24,
  md: 32,
  lg: 40,
}

/**
 * Product / brand mark: shaped color field with a centered icon.
 * Pass `shape`, `backgroundColor`, and `icon` to match branding.
 */
export const Logo = forwardRef<HTMLSpanElement, LogoProps>(function Logo(
  {
    icon,
    backgroundColor = 'var(--kf-brand)',
    iconColor = '#fff',
    shape = 'clover',
    size = 'md',
    label,
    className,
    style,
    ...props
  },
  ref,
) {
  const px = sizePx[size]
  const mergedStyle = {
    ...style,
    width: px,
    height: px,
    '--kf-logo-bg': backgroundColor,
    '--kf-logo-fg': iconColor,
  } as CSSProperties

  return (
    <span
      ref={ref}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cx('kf-logo', `kf-logo--${size}`, `kf-logo--${shape}`, className)}
      data-shape={shape}
      style={mergedStyle}
      {...props}
    >
      <svg className="kf-logo__shape" viewBox="0 0 40 40" aria-hidden focusable="false">
        <LogoShapeGraphic shape={shape} />
      </svg>
      <span className="kf-logo__icon">{icon}</span>
    </span>
  )
})
