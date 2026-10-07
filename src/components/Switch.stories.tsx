import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './Switch'

const meta: Meta<typeof Switch> = {
  title: 'Forms/Switch',
  component: Switch,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Switch>

export const Off: Story = { args: { label: 'Passwordless login' } }
export const On: Story = {
  args: { label: 'Require SSO', description: 'Force SSO for all users', defaultChecked: true },
}
export const Disabled: Story = {
  args: { label: 'Managed by org policy', disabled: true, defaultChecked: true },
}
