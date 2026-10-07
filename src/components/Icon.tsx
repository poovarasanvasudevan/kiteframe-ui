import type { LucideIcon, LucideProps } from 'lucide-react'
import { cx } from '../utils/cx'

export type IconProps = LucideProps & {
  icon: LucideIcon
  label?: string
}

export function Icon({ icon: Glyph, label, className, size = 16, ...props }: IconProps) {
  return (
    <span className={cx('kf-icon', className)} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <Glyph size={size} {...props} />
    </span>
  )
}

export * as Icons from 'lucide-react'
