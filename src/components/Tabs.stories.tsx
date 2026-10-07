import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabList, Tab, TabPanel } from './Tabs'
import { PageHeader } from './PageHeader'
import { Button } from './Button'
import { SearchBox } from './SearchBox'

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Tabbed navigation with two layouts: **horizontal** (underline under the active tab) and **vertical** (settings-style pill list). Use arrow keys to move focus; `Tab` / `TabList` / `TabPanel` compose together.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof Tabs>

export const Horizontal: Story = {
  name: 'Horizontal (underline)',
  render: () => (
    <Tabs defaultValue="all">
      <TabList aria-label="User filters">
        <Tab value="all">All</Tab>
        <Tab value="pending">Pending</Tab>
      </TabList>
      <TabPanel value="all">
        <p style={{ margin: 0, color: 'var(--kf-copy)', font: '400 12px/1.5 var(--kf-font)' }}>
          Showing all users in this workspace.
        </p>
      </TabPanel>
      <TabPanel value="pending">
        <p style={{ margin: 0, color: 'var(--kf-copy)', font: '400 12px/1.5 var(--kf-font)' }}>
          Users waiting for approval.
        </p>
      </TabPanel>
    </Tabs>
  ),
}

export const Vertical: Story = {
  name: 'Vertical (settings nav)',
  render: () => (
    <Tabs orientation="vertical" defaultValue="users" style={{ minHeight: 360 }}>
      <TabList aria-label="Settings sections">
        <Tab value="survey">Global survey limit</Tab>
        <Tab value="users">User management</Tab>
        <Tab value="templates">Saved templates</Tab>
        <Tab value="blocklist">Blocklist</Tab>
        <Tab value="fields">Contact fields</Tab>
        <Tab value="tags">Tags</Tab>
        <Tab value="dkim">DKIM settings</Tab>
        <Tab value="domain">Custom domain mapping</Tab>
        <Tab value="account">Account info</Tab>
      </TabList>
      <TabPanel value="users">
        <PageHeader
          title="User management"
          actions={
            <>
              <SearchBox placeholder="Search users" style={{ width: 200 }} />
              <Button variant="primary" size="sm">
                Add user
              </Button>
            </>
          }
        />
        <Tabs defaultValue="all">
          <TabList aria-label="User status">
            <Tab value="all">All</Tab>
            <Tab value="pending">Pending</Tab>
          </TabList>
          <TabPanel value="all">
            <p style={{ margin: 0, color: 'var(--kf-copy)', font: '400 12px/1.5 var(--kf-font)' }}>
              Nested horizontal tabs work inside a vertical settings layout.
            </p>
          </TabPanel>
          <TabPanel value="pending">
            <p style={{ margin: 0, color: 'var(--kf-copy)', font: '400 12px/1.5 var(--kf-font)' }}>
              Pending invitations appear here.
            </p>
          </TabPanel>
        </Tabs>
      </TabPanel>
      <TabPanel value="survey">Survey limit settings</TabPanel>
      <TabPanel value="templates">Saved templates</TabPanel>
      <TabPanel value="blocklist">Blocklist</TabPanel>
      <TabPanel value="fields">Contact fields</TabPanel>
      <TabPanel value="tags">Tags</TabPanel>
      <TabPanel value="dkim">DKIM settings</TabPanel>
      <TabPanel value="domain">Custom domain mapping</TabPanel>
      <TabPanel value="account">Account info</TabPanel>
    </Tabs>
  ),
}

export const ControlledHorizontal: Story = {
  render: () => {
    const [tab, setTab] = useState('published')
    return (
      <Tabs value={tab} defaultValue="published" onValueChange={setTab}>
        <TabList aria-label="Article status">
          <Tab value="all">All</Tab>
          <Tab value="draft">Draft</Tab>
          <Tab value="published">Published</Tab>
          <Tab value="archived">Archived</Tab>
        </TabList>
        <TabPanel value="all">All articles</TabPanel>
        <TabPanel value="draft">Drafts</TabPanel>
        <TabPanel value="published">Published articles (active: {tab})</TabPanel>
        <TabPanel value="archived">Archived</TabPanel>
      </Tabs>
    )
  },
}
