import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from 'react'
import {
  Notification,
  NotificationViewport,
  type NotificationPlacement,
  type NotificationTone,
} from '../components/Notification'

export type NotificationRecord = {
  id: string
  tone: NotificationTone
  title?: ReactNode
  description?: ReactNode
  icon?: ReactNode | false
  actions?: ReactNode
  /** Auto-dismiss ms. `0` keeps until dismissed. Defaults to provider / store default. */
  duration?: number
  /** Override display component for this item only. */
  component?: ComponentType<NotificationRenderProps>
}

/** Props passed to the default or custom notification display component. */
export type NotificationRenderProps = {
  id: string
  tone: NotificationTone
  title?: ReactNode
  description?: ReactNode
  icon?: ReactNode | false
  actions?: ReactNode
  onDismiss: () => void
}

export type NotifyOptions = {
  id?: string
  tone?: NotificationTone
  title?: ReactNode
  description?: ReactNode
  icon?: ReactNode | false
  actions?: ReactNode
  duration?: number
  component?: ComponentType<NotificationRenderProps>
}

export type UseNotificationsOptions = {
  /** Default auto-dismiss in ms. `0` = no auto-dismiss. Default `5000`. */
  defaultDuration?: number
  /** Max visible notifications; oldest drop first. Default unlimited. */
  max?: number
}

export type UseNotificationsResult = {
  notifications: NotificationRecord[]
  notify: (options: NotifyOptions) => string
  dismiss: (id: string) => void
  clear: () => void
  info: (title: ReactNode, options?: Omit<NotifyOptions, 'tone' | 'title'>) => string
  success: (title: ReactNode, options?: Omit<NotifyOptions, 'tone' | 'title'>) => string
  warning: (title: ReactNode, options?: Omit<NotifyOptions, 'tone' | 'title'>) => string
  danger: (title: ReactNode, options?: Omit<NotifyOptions, 'tone' | 'title'>) => string
}

let notificationSeq = 0
function createNotificationId() {
  notificationSeq += 1
  return `kf-notification-${notificationSeq}`
}

/** Standalone queue + helpers. Wire your own viewport, or use `NotificationProvider`. */
export function useNotifications(options: UseNotificationsOptions = {}): UseNotificationsResult {
  const { defaultDuration = 5000, max } = options
  const [notifications, setNotifications] = useState<NotificationRecord[]>([])
  const timersRef = useRef(new Map<string, number>())
  const defaultDurationRef = useRef(defaultDuration)
  const maxRef = useRef(max)
  defaultDurationRef.current = defaultDuration
  maxRef.current = max

  const clearTimer = useCallback((id: string) => {
    const timer = timersRef.current.get(id)
    if (timer != null) {
      window.clearTimeout(timer)
      timersRef.current.delete(id)
    }
  }, [])

  const dismiss = useCallback(
    (id: string) => {
      clearTimer(id)
      setNotifications((list) => list.filter((item) => item.id !== id))
    },
    [clearTimer],
  )

  const clear = useCallback(() => {
    for (const id of timersRef.current.keys()) clearTimer(id)
    setNotifications([])
  }, [clearTimer])

  useEffect(() => () => {
    for (const timer of timersRef.current.values()) window.clearTimeout(timer)
    timersRef.current.clear()
  }, [])

  const notify = useCallback(
    (input: NotifyOptions) => {
      const id = input.id ?? createNotificationId()
      const tone = input.tone ?? 'info'
      const record: NotificationRecord = {
        id,
        tone,
        title: input.title,
        description: input.description,
        icon: input.icon,
        actions: input.actions,
        duration: input.duration,
        component: input.component,
      }

      setNotifications((list) => {
        const without = list.filter((item) => item.id !== id)
        const next = [...without, record]
        const limit = maxRef.current
        if (limit != null && limit > 0 && next.length > limit) {
          const dropped = next.slice(0, next.length - limit)
          for (const item of dropped) clearTimer(item.id)
          return next.slice(next.length - limit)
        }
        return next
      })

      clearTimer(id)
      const duration = input.duration ?? defaultDurationRef.current
      if (duration > 0) {
        const timer = window.setTimeout(() => dismiss(id), duration)
        timersRef.current.set(id, timer)
      }

      return id
    },
    [clearTimer, dismiss],
  )

  const toneHelper = useCallback(
    (tone: NotificationTone) => (title: ReactNode, opts: Omit<NotifyOptions, 'tone' | 'title'> = {}) =>
      notify({ ...opts, tone, title }),
    [notify],
  )

  return useMemo(
    () => ({
      notifications,
      notify,
      dismiss,
      clear,
      info: toneHelper('info'),
      success: toneHelper('success'),
      warning: toneHelper('warning'),
      danger: toneHelper('danger'),
    }),
    [notifications, notify, dismiss, clear, toneHelper],
  )
}

/** Default display used by `NotificationProvider` when no custom `component` is set. */
export function DefaultNotificationView({
  tone,
  title,
  description,
  icon,
  actions,
  onDismiss,
}: NotificationRenderProps) {
  return (
    <Notification tone={tone} title={title} icon={icon} actions={actions} onDismiss={onDismiss}>
      {description}
    </Notification>
  )
}

type NotificationContextValue = UseNotificationsResult

const NotificationContext = createContext<NotificationContextValue | null>(null)

export type NotificationProviderProps = UseNotificationsOptions & {
  children?: ReactNode
  placement?: NotificationPlacement
  /** Custom display component for all toasts (overridable per `notify`). */
  component?: ComponentType<NotificationRenderProps>
  className?: string
}

/** Provides `useNotification()` and renders the viewport stack. */
export function NotificationProvider({
  children,
  placement = 'top-right',
  defaultDuration = 5000,
  max,
  component: Component = DefaultNotificationView,
  className,
}: NotificationProviderProps) {
  const api = useNotifications({ defaultDuration, max })

  return (
    <NotificationContext.Provider value={api}>
      {children}
      <NotificationViewport placement={placement} className={className}>
        {api.notifications.map((item) => {
          const View = item.component ?? Component
          return (
            <View
              key={item.id}
              id={item.id}
              tone={item.tone}
              title={item.title}
              description={item.description}
              icon={item.icon}
              actions={item.actions}
              onDismiss={() => api.dismiss(item.id)}
            />
          )
        })}
      </NotificationViewport>
    </NotificationContext.Provider>
  )
}

/** Access the notification API from `NotificationProvider`. */
export function useNotification(): UseNotificationsResult {
  const ctx = useContext(NotificationContext)
  if (!ctx) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return ctx
}
