import {
  createContext,
  useContext,
  useId,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { ChevronDown } from 'lucide-react'
import { useControllableState } from '../hooks/useControllableState'
import { cx } from '../utils/cx'

type AccordionContextValue = {
  openItems: string[]
  toggle: (value: string) => void
  type: 'single' | 'multiple'
  baseId: string
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

function useAccordion() {
  const ctx = useContext(AccordionContext)
  if (!ctx) throw new Error('Accordion components must be used within <Accordion>')
  return ctx
}

export type AccordionProps = HTMLAttributes<HTMLDivElement> & {
  /** `single` keeps one panel open; `multiple` allows several. */
  type?: 'single' | 'multiple'
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  children: ReactNode
}

/** Multi-section expand/collapse group. Compose with Item / Trigger / Panel. */
export function Accordion({
  type = 'single',
  value,
  defaultValue = [],
  onValueChange,
  className,
  children,
  ...props
}: AccordionProps) {
  const [openItems, setOpenItems] = useControllableState({ value, defaultValue, onChange: onValueChange })
  const baseId = useId()

  const toggle = (item: string) => {
    if (type === 'single') {
      setOpenItems(openItems.includes(item) ? [] : [item])
      return
    }
    setOpenItems(openItems.includes(item) ? openItems.filter((v) => v !== item) : [...openItems, item])
  }

  return (
    <AccordionContext.Provider value={{ openItems, toggle, type, baseId }}>
      <div className={cx('kf-accordion', className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

const ItemContext = createContext<{ value: string; disabled: boolean }>({ value: '', disabled: false })

export type AccordionItemProps = HTMLAttributes<HTMLDivElement> & {
  value: string
  disabled?: boolean
  children: ReactNode
}

export function AccordionItem({ value, disabled = false, className, children, ...props }: AccordionItemProps) {
  return (
    <ItemContext.Provider value={{ value, disabled }}>
      <div
        className={cx('kf-accordion__item', disabled && 'kf-accordion__item--disabled', className)}
        data-disabled={disabled || undefined}
        {...props}
      >
        {children}
      </div>
    </ItemContext.Provider>
  )
}

export type AccordionTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>

export function AccordionTrigger({ className, children, disabled, ...props }: AccordionTriggerProps) {
  const accordion = useAccordion()
  const item = useContext(ItemContext)
  const open = accordion.openItems.includes(item.value)
  const isDisabled = disabled || item.disabled

  return (
    <button
      type="button"
      className={cx('kf-accordion__trigger', className)}
      aria-expanded={open}
      aria-controls={`${accordion.baseId}-panel-${item.value}`}
      id={`${accordion.baseId}-trigger-${item.value}`}
      disabled={isDisabled}
      onClick={() => accordion.toggle(item.value)}
      {...props}
    >
      <span className="kf-accordion__label">{children}</span>
      <ChevronDown className="kf-accordion__chevron" size={14} aria-hidden />
    </button>
  )
}

export type AccordionPanelProps = HTMLAttributes<HTMLDivElement>

export function AccordionPanel({ className, children, ...props }: AccordionPanelProps) {
  const accordion = useAccordion()
  const item = useContext(ItemContext)
  if (!accordion.openItems.includes(item.value)) return null

  return (
    <div
      id={`${accordion.baseId}-panel-${item.value}`}
      role="region"
      aria-labelledby={`${accordion.baseId}-trigger-${item.value}`}
      className={cx('kf-accordion__panel', className)}
      {...props}
    >
      {children}
    </div>
  )
}
