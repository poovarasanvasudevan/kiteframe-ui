import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Feedback/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'ORGANIZATION-ADMIN' },
}
export default meta
type Story = StoryObj<typeof Badge>

export const OrgAdmin: Story = { args: { tone: 'org' } }
export const Success: Story = { args: { tone: 'success', children: 'Active' } }
export const Warning: Story = { args: { tone: 'warning', children: 'Pending' } }
export const Danger: Story = { args: { tone: 'danger', children: 'Blocked' } }
export const Accent: Story = { args: { tone: 'accent', children: 'Beta' } }
