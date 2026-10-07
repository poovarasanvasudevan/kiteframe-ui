import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { cx } from '../utils/cx'

export type SettingsRowProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode
  title: ReactNode
  description?: ReactNode
  /** Center-right slot for stats or status list. */
  meta?: ReactNode
  showChevron?: boolean
}

/**
 * Clickable settings list row: icon + title/description + flexible meta + chevron.
 * Settings list row used on Security Settings pages.
 */
export function SettingsRow({
  icon,
  title,
  description,
  meta,
  showChevron = true,
  className,
  type = 'button',
  ...props
}: SettingsRowProps) {
  return (
    <button type={type} className={cx('kf-settings-row', className)} {...props}>
      {icon ? <span className="kf-settings-row__icon">{icon}</span> : null}
      <span className="kf-settings-row__text">
        <span className="kf-settings-row__title">{title}</span>
        {description ? <span className="kf-settings-row__desc">{description}</span> : null}
      </span>
      {meta ? <span className="kf-settings-row__meta">{meta}</span> : null}
      {showChevron ? (
        <span className="kf-settings-row__chevron" aria-hidden>
          <ChevronRight />
        </span>
      ) : null}
    </button>
  )
}

export type SettingsStatProps = {
  value: ReactNode
  label: ReactNode
  className?: string
}

/** Stat cell used inside SettingsRow meta (e.g. "4 Accounts"). */
export function SettingsStat({ value, label, className }: SettingsStatProps) {
  return (
    <span className={cx('kf-settings-stat', className)}>
      <span className="kf-settings-stat__value">{value}</span>
      <span className="kf-settings-stat__label">{label}</span>
    </span>
  )
}
