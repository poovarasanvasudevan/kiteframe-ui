import { useId, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { useControllableState } from '../hooks/useControllableState'
import { cx } from '../utils/cx'

export type CollapseProps = {
  /** Controlled open state. */
  open?: boolean
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Trigger label. */
  title: ReactNode
  children?: ReactNode
  disabled?: boolean
  className?: string
  triggerClassName?: string
  panelClassName?: string
}

/**
 * Single-section expand/collapse.
 * For multi-section groups use `Accordion` + `AccordionItem`.
 */
export function Collapse({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  title,
  children,
  disabled = false,
  className,
  triggerClassName,
  panelClassName,
}: CollapseProps) {
  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  const baseId = useId()
  const triggerId = `${baseId}-trigger`
  const panelId = `${baseId}-panel`

  return (
    <div className={cx('kf-accordion', 'kf-collapse', className)} data-open={open || undefined}>
      <div className={cx('kf-accordion__item', disabled && 'kf-accordion__item--disabled')}>
        <button
          type="button"
          id={triggerId}
          className={cx('kf-accordion__trigger', triggerClassName)}
          aria-expanded={open}
          aria-controls={panelId}
          disabled={disabled}
          onClick={() => setOpen(!open)}
        >
          <span className="kf-accordion__label">{title}</span>
          <ChevronDown className="kf-accordion__chevron" size={14} aria-hidden />
        </button>
        {open ? (
          <div
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            className={cx('kf-accordion__panel', panelClassName)}
          >
            {children}
          </div>
        ) : null}
      </div>
    </div>
  )
}
