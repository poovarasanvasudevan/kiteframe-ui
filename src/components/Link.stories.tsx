import type { Meta, StoryObj } from '@storybook/react'
import { ChevronRight } from 'lucide-react'
import { Link } from './Link'

const meta: Meta<typeof Link> = {
  title: 'Content/Link',
  component: Link,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Link>

export const Accent: Story = { args: { href: '#', children: 'Edit Profile' } }
export const Danger: Story = { args: { href: '#', tone: 'danger', children: 'Reject' } }
export const AsButton: Story = {
  args: { as: 'button', children: 'Approve' },
}
export const WithIcon: Story = {
  args: { href: '#', children: 'Know more', rightIcon: <ChevronRight /> },
}
