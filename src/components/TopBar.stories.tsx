import type { Meta, StoryObj } from '@storybook/react'
import { Bell, HelpCircle } from 'lucide-react'
import { TopBar } from './TopBar'
import { Avatar } from './Avatar'
import { Button } from './Button'
import { Breadcrumb } from './Breadcrumb'
import { SearchBox } from './SearchBox'

const meta: Meta<typeof TopBar> = {
  title: 'Layout/TopBar',
  component: TopBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Sticky application header chrome. Pass `title` / `leading` on the left and `actions` / `trailing` (avatar, utilities) on the right.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof TopBar>

export const TitleAndAvatar: Story = {
  args: {
    title: 'Organization',
    trailing: <Avatar name="Blake" />,
  },
}

export const WithActions: Story = {
  render: () => (
    <TopBar
      title="Dashboard"
      actions={
        <>
          <Button variant="secondary" size="sm">Request Demo</Button>
          <Button variant="primary" size="sm">Get started</Button>
        </>
      }
      trailing={
        <>
          <Button variant="ghost" iconOnly aria-label="Notifications"><Bell /></Button>
          <Button variant="ghost" iconOnly aria-label="Help"><HelpCircle /></Button>
          <Avatar name="KiteFrame" />
        </>
      }
    />
  ),
}

export const WithBreadcrumbsAndSearch: Story = {
  render: () => (
    <TopBar
      leading={
        <Breadcrumb
          items={[
            { id: 'sec', label: 'Security', href: '#' },
            { id: 'acc', label: 'Accounts and Portals', current: true },
          ]}
        />
      }
      trailing={
        <>
          <SearchBox placeholder="Search portals…" style={{ width: 220 }} />
          <Avatar name="KiteFrame" />
        </>
      }
    />
  ),
}
