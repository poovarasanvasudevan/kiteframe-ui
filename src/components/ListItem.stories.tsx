import type { Meta, StoryObj } from '@storybook/react'
import { Zap } from 'lucide-react'
import { ListItem } from './ListItem'
import { IconBadge } from './IconBadge'
import { Card, CardBody, CardHeader, CardTitle } from './Card'

const meta: Meta<typeof ListItem> = {
  title: 'Data/ListItem',
  component: ListItem,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ListItem>

export const Default: Story = {
  args: {
    icon: <IconBadge color="#2c5cc5"><Zap /></IconBadge>,
    title: 'Knowledge Hub',
    description: 'acme.kiteframe.app',
  },
}

export const ActiveWithCount: Story = {
  args: {
    ...Default.args,
    active: true,
    count: 11,
  },
}

export const AccountPicker: Story = {
  render: () => (
    <Card style={{ maxWidth: 320 }}>
      <CardHeader>
        <CardTitle>Accounts (4)</CardTitle>
      </CardHeader>
      <CardBody style={{ display: 'grid', gap: 8 }}>
        <ListItem
          active
          count={11}
          icon={<IconBadge color="#2c5cc5"><Zap /></IconBadge>}
          title="Knowledge Hub"
          description="acme.kiteframe.app"
        />
        <ListItem
          icon={<IconBadge color="#00a886"><Zap /></IconBadge>}
          title="Support Portal"
          description="support.kiteframe.app"
        />
        <ListItem
          icon={<IconBadge color="#e86f25"><Zap /></IconBadge>}
          title="Sales Workspace"
          description="sales.kiteframe.app"
        />
      </CardBody>
    </Card>
  ),
}
