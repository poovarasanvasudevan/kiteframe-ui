import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarGroup } from './Avatar'
import { Badge } from './Badge'
import { Link } from './Link'

const meta: Meta<typeof Avatar> = {
  title: 'Content/Avatar',
  component: Avatar,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Avatar>

export const Initials: Story = { args: { name: 'KiteFrame Admin' } }
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Avatar size="sm" name="Ada Lovelace" />
      <Avatar size="md" name="Ada Lovelace" />
      <Avatar size="lg" name="Ada Lovelace" />
    </div>
  ),
}

export const ProfileHeader: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar size="lg" name="Tony Stark" />
      <div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <strong style={{ font: '700 14px/1.3 var(--kf-font)', color: 'var(--kf-ink)' }}>Tony Stark</strong>
          <Badge tone="org">ORG-ADMIN</Badge>
        </div>
        <div style={{ color: 'var(--kf-muted)', font: '400 11px/1.4 var(--kf-font)' }}>tony@stark.industries</div>
        <Link href="#" style={{ marginTop: 4, display: 'inline-flex' }}>Edit Profile</Link>
      </div>
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar name="Alice" />
      <Avatar name="Bob" />
      <Avatar name="Carol" />
      <Avatar name="Dan" />
      <Avatar name="Eve" />
    </AvatarGroup>
  ),
}
