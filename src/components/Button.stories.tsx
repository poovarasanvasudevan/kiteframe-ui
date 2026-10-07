import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import { Plus, Trash2 } from 'lucide-react'

const meta: Meta<typeof Button> = {
  title: 'Forms/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Save' },
}
export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = { args: { variant: 'primary' } }
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Ghost: Story = { args: { variant: 'ghost' } }
export const Danger: Story = { args: { variant: 'danger', children: 'Delete' } }
export const DangerOutline: Story = {
  args: { variant: 'danger-outline', children: 'Delete Organization' },
}
export const WithIcons: Story = {
  args: { variant: 'primary', leftIcon: <Plus />, children: 'New' },
}
export const IconOnly: Story = {
  args: { variant: 'ghost', iconOnly: true, 'aria-label': 'Delete', children: <Trash2 /> },
}
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Button size="sm" variant="primary">Small</Button>
      <Button size="md" variant="primary">Medium</Button>
      <Button size="lg" variant="primary">Large</Button>
    </div>
  ),
}
