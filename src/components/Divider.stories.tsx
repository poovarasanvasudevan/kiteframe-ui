import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from './Divider'

const meta: Meta<typeof Divider> = {
  title: 'Content/Divider',
  component: Divider,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Divider>

export const Horizontal: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <p style={{ margin: 0 }}>Above</p>
      <Divider />
      <p style={{ margin: 0 }}>Below</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'stretch', height: 40 }}>
      <span>Left</span>
      <Divider orientation="vertical" />
      <span>Right</span>
    </div>
  ),
}
