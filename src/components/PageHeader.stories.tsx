import type { Meta, StoryObj } from '@storybook/react'
import { PageHeader } from './PageHeader'
import { Breadcrumb } from './Breadcrumb'
import { Button } from './Button'

const meta: Meta<typeof PageHeader> = {
  title: 'Layout/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof PageHeader>

export const SecuritySettings: Story = {
  args: {
    title: 'Security Settings',
    helpHref: '#',
    description:
      'Manage how users sign in, which accounts and portals belong to your organization, and related security policies.',
  },
}

export const WithBreadcrumbsAndActions: Story = {
  args: {
    breadcrumbs: (
      <Breadcrumb
        items={[
          { id: 'sec', label: 'Security', href: '#' },
          { id: 'acc', label: 'Accounts and Portals', current: true },
        ]}
      />
    ),
    title: 'Accounts and Portals',
    description: 'View accounts linked to your organization and their portals.',
    actions: <Button variant="primary">Add account</Button>,
  },
}
