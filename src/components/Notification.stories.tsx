import type { Meta, StoryObj } from '@storybook/react'
import {
  Notification,
  NotificationViewport,
  type NotificationTone,
} from './Notification'
import {
  DefaultNotificationView,
  NotificationProvider,
  useNotification,
  useNotifications,
  type NotificationRenderProps,
} from '../hooks/useNotifications'
import { Button } from './Button'
import { Link } from './Link'

const meta: Meta<typeof Notification> = {
  title: 'Feedback/Notification',
  component: Notification,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Toast-style feedback. Prefer `NotificationProvider` + `useNotification()` for app use. Pass a custom `component` to render your own UI. Use `Alert` for inline banners.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof Notification>

export const Success: Story = {
  args: {
    tone: 'success',
    title: 'Settings saved',
    children: 'Organization preferences were updated.',
    onDismiss: () => undefined,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
}

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
      {(['info', 'success', 'warning', 'danger'] as NotificationTone[]).map((tone) => (
        <Notification
          key={tone}
          tone={tone}
          title={tone.charAt(0).toUpperCase() + tone.slice(1)}
          onDismiss={() => undefined}
        >
          Sample {tone} notification.
        </Notification>
      ))}
    </div>
  ),
}

export const WithActions: Story = {
  args: {
    tone: 'warning',
    title: 'Invite pending',
    children: 'Alex has not accepted the organization invite.',
    actions: <Link href="#">Resend invite</Link>,
    onDismiss: () => undefined,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
}

function ProviderDemoButtons() {
  const { success, danger, clear } = useNotification()
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button
        variant="primary"
        onClick={() =>
          success('Account linked', {
            description: 'acme.kiteframe.app is now in your org.',
          })
        }
      >
        Success
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          danger('Transfer failed', {
            description: 'The domain could not be verified.',
          })
        }
      >
        Error
      </Button>
      <Button variant="ghost" onClick={clear}>
        Clear all
      </Button>
    </div>
  )
}

export const WithProvider: Story = {
  name: 'Provider + useNotification',
  render: () => (
    <NotificationProvider placement="top-right" defaultDuration={4000} max={4}>
      <ProviderDemoButtons />
    </NotificationProvider>
  ),
}

function CompactToast({ tone, title, description, onDismiss }: NotificationRenderProps) {
  return (
    <div
      role="status"
      className={`kf-notification kf-notification--${tone}`}
      style={{ padding: '10px 12px', gap: 8 }}
    >
      <div className="kf-notification__body">
        <div className="kf-notification__title">{title}</div>
        {description ? <div className="kf-notification__content">{description}</div> : null}
      </div>
      <button type="button" className="kf-notification__dismiss" aria-label="Dismiss" onClick={onDismiss}>
        ×
      </button>
    </div>
  )
}

function CustomComponentDemo() {
  const { notify, clear } = useNotification()
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button
        variant="primary"
        onClick={() =>
          notify({
            tone: 'info',
            title: 'Custom default UI',
            description: 'Rendered by CompactToast via provider `component`.',
          })
        }
      >
        Provider custom UI
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          notify({
            tone: 'success',
            title: 'Per-toast override',
            description: 'Uses DefaultNotificationView for this item only.',
            component: DefaultNotificationView,
          })
        }
      >
        Per-item override
      </Button>
      <Button variant="ghost" onClick={clear}>
        Clear
      </Button>
    </div>
  )
}

export const CustomDisplay: Story = {
  name: 'Custom display component',
  render: () => (
    <NotificationProvider placement="bottom-right" component={CompactToast} defaultDuration={5000}>
      <CustomComponentDemo />
    </NotificationProvider>
  ),
}

export const StandaloneHook: Story = {
  name: 'useNotifications (manual viewport)',
  render: () => {
    const { notifications, success, dismiss, clear } = useNotifications({ defaultDuration: 5000 })
    return (
      <>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button
            variant="primary"
            onClick={() => success('Saved', { description: 'Manual viewport wiring.' })}
          >
            Notify
          </Button>
          <Button variant="ghost" onClick={clear}>
            Clear
          </Button>
        </div>
        <NotificationViewport placement="top-left">
          {notifications.map((item) => (
            <DefaultNotificationView
              key={item.id}
              {...item}
              onDismiss={() => dismiss(item.id)}
            />
          ))}
        </NotificationViewport>
      </>
    )
  },
}
