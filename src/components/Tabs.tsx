import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { useControllableState } from '../hooks/useControllableState'
import { cx } from '../utils/cx'

export type TabsOrientation = 'horizontal' | 'vertical'

type TabsContextValue = {
  value: string
  setValue: (value: string) => void
  baseId: string
  orientation: TabsOrientation
  registerTab: (value: string, el: HTMLButtonElement | null) => void
  focusTab: (value: string) => void
  values: () => string[]
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
  /** `horizontal` = underline bar (default). `vertical` = settings-style side nav pills. */
  orientation?: TabsOrientation
  children: ReactNode
}

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  orientation = 'horizontal',
  className,
  children,
  ...props
}: TabsProps) {
  const [current, setValue] = useControllableState({ value, defaultValue, onChange: onValueChange })
  const baseId = useId()
  const tabEls = useRef(new Map<string, HTMLButtonElement>())
  const order = useRef<string[]>([])

  const registerTab = useCallback((tabValue: string, el: HTMLButtonElement | null) => {
    if (el) {
      tabEls.current.set(tabValue, el)
      if (!order.current.includes(tabValue)) order.current.push(tabValue)
    } else {
      tabEls.current.delete(tabValue)
      order.current = order.current.filter((v) => v !== tabValue)
    }
  }, [])

  const focusTab = useCallback((tabValue: string) => {
    tabEls.current.get(tabValue)?.focus()
  }, [])

  const values = useCallback(() => order.current.slice(), [])

  const ctx = useMemo(
    () => ({
      value: current,
      setValue,
      baseId,
      orientation,
      registerTab,
      focusTab,
      values,
    }),
    [current, setValue, baseId, orientation, registerTab, focusTab, values],
  )

  return (
    <TabsContext.Provider value={ctx}>
      <div
        className={cx(
          'kf-tabs-root',
          orientation === 'vertical' && 'kf-tabs-root--vertical',
          className,
        )}
        data-orientation={orientation}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export type TabListProps = HTMLAttributes<HTMLDivElement> & {
  /** Override orientation from parent Tabs (rarely needed). */
  orientation?: TabsOrientation
}

export function TabList({ className, orientation: orientationProp, ...props }: TabListProps) {
  const tabs = useTabs()
  const orientation = orientationProp ?? tabs.orientation

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const list = tabs.values()
    if (!list.length) return
    const index = list.indexOf(tabs.value)
    const horizontal = orientation === 'horizontal'
    const nextKey = horizontal ? 'ArrowRight' : 'ArrowDown'
    const prevKey = horizontal ? 'ArrowLeft' : 'ArrowUp'

    let nextIndex = -1
    if (event.key === nextKey) nextIndex = (index + 1) % list.length
    else if (event.key === prevKey) nextIndex = index <= 0 ? list.length - 1 : index - 1
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = list.length - 1

    if (nextIndex < 0) return
    event.preventDefault()
    const next = list[nextIndex]
    tabs.setValue(next)
    tabs.focusTab(next)
  }

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      className={cx(
        'kf-tabs',
        orientation === 'vertical' ? 'kf-tabs--vertical' : 'kf-tabs--horizontal',
        className,
      )}
      onKeyDown={onKeyDown}
      {...props}
    />
  )
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
      data-orientation={tabs.orientation}
      className={cx(
        'kf-tabs__tab',
        tabs.orientation === 'vertical' && 'kf-tabs__tab--vertical',
        className,
      )}
      ref={(node) => tabs.registerTab(value, node)}
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
      className={cx('kf-tabs__panel', tabs.orientation === 'vertical' && 'kf-tabs__panel--vertical', className)}
      {...props}
    />
  )
}
