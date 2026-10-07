import { createContext, useContext, useId, type HTMLAttributes, type ReactNode } from 'react'
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
  type?: 'single' | 'multiple'
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  children: ReactNode
}

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

const ItemContext = createContext<string>('')

export type AccordionItemProps = HTMLAttributes<HTMLDivElement> & {
  value: string
  children: ReactNode
}

export function AccordionItem({ value, className, children, ...props }: AccordionItemProps) {
  return (
    <ItemContext.Provider value={value}>
      <div className={cx('kf-accordion__item', className)} {...props}>
        {children}
      </div>
    </ItemContext.Provider>
  )
}

export function AccordionTrigger({ className, children, ...props }: HTMLAttributes<HTMLButtonElement>) {
  const accordion = useAccordion()
  const value = useContext(ItemContext)
  const open = accordion.openItems.includes(value)
  return (
    <button
      type="button"
      className={cx('kf-accordion__trigger', className)}
      aria-expanded={open}
      aria-controls={`${accordion.baseId}-panel-${value}`}
      id={`${accordion.baseId}-trigger-${value}`}
      onClick={() => accordion.toggle(value)}
      {...props}
    >
      <span>{children}</span>
      <ChevronDown className="kf-accordion__chevron" size={14} aria-hidden />
    </button>
  )
}

export function AccordionPanel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const accordion = useAccordion()
  const value = useContext(ItemContext)
  if (!accordion.openItems.includes(value)) return null
  return (
    <div
      id={`${accordion.baseId}-panel-${value}`}
      role="region"
      aria-labelledby={`${accordion.baseId}-trigger-${value}`}
      className={cx('kf-accordion__panel', className)}
      {...props}
    />
  )
}
