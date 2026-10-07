import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cx } from '../utils/cx'

export type TypographyVariant =
  | 'display'
  | 'title'
  | 'subtitle'
  | 'body'
  | 'caption'
  | 'label'
  | 'overline'

const defaults: Record<TypographyVariant, ElementType> = {
  display: 'h1',
  title: 'h2',
  subtitle: 'h3',
  body: 'p',
  caption: 'p',
  label: 'span',
  overline: 'span',
}

export type TypographyProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType
  variant?: TypographyVariant
  mono?: boolean
  children?: ReactNode
}

export function Typography({
  as,
  variant = 'body',
  mono,
  className,
  children,
  ...props
}: TypographyProps) {
  const Tag = as ?? defaults[variant]
  return (
    <Tag className={cx('kf-type', `kf-type--${variant}`, mono && 'kf-type--mono', className)} {...props}>
      {children}
    </Tag>
  )
}
