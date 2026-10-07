import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'
import { Button } from './Button'

const meta: Meta<typeof Tooltip> = {
  title: 'Feedback/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Tooltip>

export const Top: Story = {
  args: {
    content: 'Continue setting up your account',
    children: <Button variant="primary">Get started</Button>,
  },
}
