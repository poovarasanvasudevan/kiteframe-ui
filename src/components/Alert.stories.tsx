import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from './Alert'
import { Link } from './Link'

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Alert>

export const Info: Story = {
  args: {
    tone: 'info',
    title: 'Important Information',
    children: (
      <ul>
        <li>Moving an account transfers ownership to your organization.</li>
        <li>The account admin will be notified of the request.</li>
      </ul>
    ),
    onDismiss: () => undefined,
  },
}

export const Warning: Story = {
  args: {
    tone: 'warning',
    children: 'This is a sample dashboard. Dismiss for real data.',
    onDismiss: () => undefined,
  },
}

export const WithActions: Story = {
  args: {
    tone: 'warning',
    title: "Don't find some of your accounts?",
    children: 'Enter the account domain URL to move it into your organization.',
    actions: <Link href="#">Know more</Link>,
  },
}
