import type { Meta, StoryObj } from '@storybook/react'
import { StatusIndicator } from './StatusIndicator'

const meta: Meta<typeof StatusIndicator> = {
  title: 'Feedback/StatusIndicator',
  component: StatusIndicator,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof StatusIndicator>

export const Active: Story = { args: { tone: 'success', icon: 'check', label: 'Active' } }
export const Disabled: Story = { args: { tone: 'danger', icon: 'cross', label: 'Disabled' } }
export const Row: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <StatusIndicator tone="success" icon="check" label="KiteFrame Login" />
      <StatusIndicator tone="success" icon="check" label="Google Login" />
      <StatusIndicator tone="danger" icon="cross" label="SSO Login" />
      <StatusIndicator tone="danger" icon="cross" label="Passwordless" />
    </div>
  ),
}
