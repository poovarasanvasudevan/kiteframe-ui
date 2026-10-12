import type { Meta, StoryObj } from '@storybook/react'
import { NotificationProvider, useNotification } from './useNotifications'
import { Button } from '../components/Button'
import { Flex } from '../components/Flex'

const meta: Meta = {
  title: 'Hooks/useNotification',
  parameters: {
    docs: {
      description: {
        component:
          'Context API from `NotificationProvider`. Call `notify` / `success` / `danger` / `dismiss` / `clear` anywhere under the provider.',
      },
    },
  },
}
export default meta

function Actions() {
  const { info, success, warning, danger, clear } = useNotification()
  return (
    <Flex gap={2} wrap>
      <Button size="sm" onClick={() => info('Heads up', { description: 'Sync starts in 5 minutes.' })}>
        Info
      </Button>
      <Button size="sm" variant="primary" onClick={() => success('Done')}>
        Success
      </Button>
      <Button size="sm" onClick={() => warning('Check billing')}>
        Warning
      </Button>
      <Button size="sm" variant="danger-outline" onClick={() => danger('Denied')}>
        Danger
      </Button>
      <Button size="sm" variant="ghost" onClick={clear}>
        Clear
      </Button>
    </Flex>
  )
}

export const Default: StoryObj = {
  render: () => (
    <NotificationProvider placement="top-right" defaultDuration={3500} max={4}>
      <Actions />
    </NotificationProvider>
  ),
}
