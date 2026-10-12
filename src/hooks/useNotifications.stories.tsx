import type { Meta, StoryObj } from '@storybook/react'
import {
  DefaultNotificationView,
  useNotifications,
} from './useNotifications'
import { NotificationViewport } from '../components/Notification'
import { Button } from '../components/Button'
import { Flex } from '../components/Flex'

const meta: Meta = {
  title: 'Hooks/useNotifications',
  parameters: {
    docs: {
      description: {
        component:
          'Standalone toast queue. Wire your own viewport, or prefer `NotificationProvider` + `useNotification` for app-wide usage.',
      },
    },
  },
}
export default meta

function Demo() {
  const { notifications, success, danger, clear, dismiss } = useNotifications({
    defaultDuration: 4000,
  })
  return (
    <>
      <Flex gap={2} wrap>
        <Button size="sm" variant="primary" onClick={() => success('Saved', { description: 'Draft published.' })}>
          Success
        </Button>
        <Button
          size="sm"
          variant="danger-outline"
          onClick={() => danger('Failed', { description: 'Could not sync.' })}
        >
          Error
        </Button>
        <Button size="sm" variant="ghost" onClick={clear}>
          Clear
        </Button>
      </Flex>
      <NotificationViewport placement="top-right">
        {notifications.map((item) => (
          <DefaultNotificationView key={item.id} {...item} onDismiss={() => dismiss(item.id)} />
        ))}
      </NotificationViewport>
    </>
  )
}

export const Default: StoryObj = { render: () => <Demo /> }
