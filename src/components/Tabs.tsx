import { createContext, useContext, useId, type HTMLAttributes, type ReactNode } from 'react'
import { useControllableState } from '../hooks/useControllableState'
import { cx } from '../utils/cx'

type TabsContextValue = {
  value: string
  setValue: (value: string) => void
  baseId: string
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabs() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tabs components must be used within <Tabs>')
  return ctx
}

export type TabsProps = HTMLAttributes<HTMLDivElement> & {
  value?: string
  defaultValue: string
  onValueChange?: (value: string) => void
  children: ReactNode
}

export function Tabs({ value, defaultValue, onValueChange, className, children, ...props }: TabsProps) {
  const [current, setValue] = useControllableState({ value, defaultValue, onChange: onValueChange })
  const baseId = useId()
  return (
    <TabsContext.Provider value={{ value: current, setValue, baseId }}>
      <div className={cx(className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export function TabList({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div role="tablist" className={cx('kf-tabs', className)} {...props} />
}

export type TabProps = HTMLAttributes<HTMLButtonElement> & {
  value: string
}

export function Tab({ value, className, children, ...props }: TabProps) {
  const tabs = useTabs()
  const selected = tabs.value === value
  return (
    <button
      type="button"
      role="tab"
      id={`${tabs.baseId}-tab-${value}`}
      aria-controls={`${tabs.baseId}-panel-${value}`}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      className={cx('kf-tabs__tab', className)}
      onClick={() => tabs.setValue(value)}
      {...props}
    >
      {children}
    </button>
  )
}

export type TabPanelProps = HTMLAttributes<HTMLDivElement> & {
  value: string
}

export function TabPanel({ value, className, ...props }: TabPanelProps) {
  const tabs = useTabs()
  if (tabs.value !== value) return null
  return (
    <div
      role="tabpanel"
      id={`${tabs.baseId}-panel-${value}`}
      aria-labelledby={`${tabs.baseId}-tab-${value}`}
      className={cx('kf-tabs__panel', className)}
      {...props}
    />
  )
}
