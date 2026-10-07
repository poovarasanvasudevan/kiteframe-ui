import type { HTMLAttributes, ImgHTMLAttributes, ReactNode } from 'react'
import { cx } from '../utils/cx'

export type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
  src?: string
  alt?: string
  name?: string
  size?: 'sm' | 'md' | 'lg'
  fallback?: ReactNode
  imgProps?: ImgHTMLAttributes<HTMLImageElement>
}

function initials(name?: string) {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
}

export function Avatar({ src, alt, name, size = 'md', fallback, className, imgProps, ...props }: AvatarProps) {
  return (
    <span className={cx('kf-avatar', size !== 'md' && `kf-avatar--${size}`, className)} title={name} {...props}>
      {src ? <img src={src} alt={alt ?? name ?? ''} {...imgProps} /> : (fallback ?? initials(name))}
    </span>
  )
}

export type AvatarGroupProps = HTMLAttributes<HTMLDivElement> & {
  max?: number
  children: ReactNode
}

export function AvatarGroup({ max = 4, children, className, ...props }: AvatarGroupProps) {
  const items = Array.isArray(children) ? children : [children]
  const visible = items.slice(0, max)
  const overflow = items.length - visible.length
  return (
    <div className={cx('kf-avatar-group', className)} {...props}>
      {visible}
      {overflow > 0 ? <Avatar fallback={`+${overflow}`} /> : null}
    </div>
  )
}
