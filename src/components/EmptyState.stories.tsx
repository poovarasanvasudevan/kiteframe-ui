import type { Meta, StoryObj } from '@storybook/react'
import { Inbox } from 'lucide-react'
import { EmptyState } from './EmptyState'
import { Button } from './Button'

const meta: Meta<typeof EmptyState> = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof EmptyState>

export const Default: Story = {
  args: {
    icon: <Inbox />,
    title: 'No accounts yet',
    description: 'Move an existing KiteFrame account into this organization to get started.',
    actions: <Button variant="primary">Move Account</Button>,
  },
}
