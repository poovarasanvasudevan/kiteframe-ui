import type { Meta, StoryObj } from '@storybook/react'
import { Zap, Headphones, MapPin } from 'lucide-react'
import { IconBadge } from './IconBadge'

const meta: Meta<typeof IconBadge> = {
  title: 'Content/IconBadge',
  component: IconBadge,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof IconBadge>

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <IconBadge color="#2c5cc5"><Zap /></IconBadge>
      <IconBadge color="#00a886"><Headphones /></IconBadge>
      <IconBadge color="#e86f25"><MapPin /></IconBadge>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <IconBadge size="sm" color="#2c5cc5"><Zap /></IconBadge>
      <IconBadge size="md" color="#2c5cc5"><Zap /></IconBadge>
      <IconBadge size="lg" color="#2c5cc5"><Zap /></IconBadge>
    </div>
  ),
}
