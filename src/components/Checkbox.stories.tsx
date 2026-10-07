import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: { label: 'Send weekly digest' },
}

export const WithDescription: Story = {
  args: {
    label: 'Follow up with customer about Upgrade',
    description: 'IN A DAY',
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: { label: 'Locked option', disabled: true, defaultChecked: true },
}
