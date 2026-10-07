import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { X } from 'lucide-react'
import { cx } from '../utils/cx'

export type ChipTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger'

export type ChipProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: ChipTone
  onRemove?: () => void
  removeLabel?: string
  leftIcon?: ReactNode
}

export function Chip({
  tone = 'neutral',
  onRemove,
  removeLabel = 'Remove',
  leftIcon,
  className,
  children,
  ...props
}: ChipProps) {
  return (
    <span className={cx('kf-chip', tone !== 'neutral' && `kf-chip--${tone}`, className)} {...props}>
      {leftIcon}
      {children}
      {onRemove ? (
        <button type="button" className="kf-chip__remove" aria-label={removeLabel} onClick={onRemove}>
          <X />
        </button>
      ) : null}
    </span>
  )
}

export type ChipButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: ChipTone
  active?: boolean
}

export function ChipButton({ tone = 'neutral', active, className, ...props }: ChipButtonProps) {
  return (
    <button
      type="button"
      className={cx('kf-chip', tone !== 'neutral' && `kf-chip--${tone}`, active && 'kf-chip--accent', className)}
      {...props}
    />
  )
}
