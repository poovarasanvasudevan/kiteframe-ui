import type { Meta, StoryObj } from '@storybook/react'
import {
  Gauge,
  Users,
  CreditCard,
  Shield,
  Building2,
  LayoutGrid,
  KeyRound,
  Settings,
} from 'lucide-react'
import { AppLayout } from './AppLayout'
import { Sidebar, SidebarItem, SidebarFooterButton } from './Sidebar'
import { TopBar } from './TopBar'
import { Avatar } from './Avatar'
import { PageHeader } from './PageHeader'
import { SectionHeader } from './SectionHeader'
import { Card, CardBody } from './Card'
import { SettingsRow, SettingsStat } from './SettingsRow'
import { StatusIndicator } from './StatusIndicator'
import { InfoPanel, HelpList, HelpListItem } from './HelpList'
import { TextField } from './TextField'
import { Button } from './Button'

const meta: Meta<typeof AppLayout> = {
  title: 'Layout/AppLayout',
  component: AppLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Application shell that reserves a left rail for `Sidebar`, a sticky `TopBar`, main content, and an optional right `aside` panel. The rail column prevents the sidebar from overlapping the toolbar or page content.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof AppLayout>

function KiteFrameSidebar({ active = 'security' }: { active?: string }) {
  return (
    <Sidebar
      brand={<span className="kf-sidebar__mark">K</span>}
      footer={<SidebarFooterButton label="Apps" icon={<LayoutGrid />} />}
    >
      <SidebarItem href="#" label="Overview" icon={<Gauge />} active={active === 'overview'} />
      <SidebarItem href="#" label="Users" icon={<Users />} active={active === 'users'} />
      <SidebarItem href="#" label="Billing" icon={<CreditCard />} active={active === 'billing'} />
      <SidebarItem href="#" label="Security" icon={<Shield />} active={active === 'security'} />
      <SidebarItem href="#" label="Organization" icon={<Building2 />} active={active === 'org'} />
    </Sidebar>
  )
}

export const SecuritySettingsPage: Story = {
  name: 'Security settings page',
  render: () => (
    <AppLayout
      sidebar={<KiteFrameSidebar />}
      topbar={<TopBar title="Security" trailing={<Avatar name="KiteFrame" />} />}
    >
      <Card>
        <CardBody>
          <PageHeader
            title="Security Settings"
            helpHref="#"
            description="Manage sign-in methods, accounts, portals, and related security policies for your organization."
          />
          <SectionHeader
            title="Signing in to KiteFrame"
            description="Choose default login methods and view accounts linked to this organization."
          />
          <SettingsRow
            icon={<Settings />}
            title="Accounts and Portals"
            description="View the list of accounts and portals in your organization."
            meta={
              <>
                <SettingsStat value="4" label="Accounts" />
                <SettingsStat value="11" label="Portals" />
              </>
            }
          />
          <SettingsRow
            icon={<KeyRound />}
            title="Default Login Methods"
            description="Configure how users authenticate across KiteFrame products."
            meta={
              <>
                <StatusIndicator tone="success" icon="check" label="KiteFrame Login" />
                <StatusIndicator tone="success" icon="check" label="Google Login" />
                <StatusIndicator tone="danger" icon="cross" label="SSO Login" />
                <StatusIndicator tone="danger" icon="cross" label="Passwordless" />
              </>
            }
          />
        </CardBody>
      </Card>
    </AppLayout>
  ),
}

export const WithAsidePanel: Story = {
  name: 'With aside panel',
  render: () => (
    <AppLayout
      sidebar={<KiteFrameSidebar active="org" />}
      topbar={<TopBar title="Organization" trailing={<Avatar name="Blake" />} />}
      aside={
        <InfoPanel title="About Organization">
          <p>Organizations let you manage multiple KiteFrame accounts from one place.</p>
          <ul>
            <li>Share security policies across accounts</li>
            <li>Centralize billing and user access</li>
          </ul>
          <HelpList title="Help articles">
            <HelpListItem href="#">What is an organization?</HelpListItem>
            <HelpListItem href="#">Manage organization admins</HelpListItem>
          </HelpList>
        </InfoPanel>
      }
    >
      <PageHeader
        title="Organization details"
        description="Update your organization name, branding, and URL."
      />
      <Card>
        <CardBody style={{ display: 'grid', gap: 16 }}>
          <TextField label="Organization name *" defaultValue="Acme Corp" />
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="primary">Save</Button>
            <Button variant="ghost">Cancel</Button>
          </div>
        </CardBody>
      </Card>
    </AppLayout>
  ),
}

export const MainOnly: Story = {
  name: 'Main only (no sidebar)',
  render: () => (
    <AppLayout topbar={<TopBar title="Standalone view" trailing={<Avatar name="User" />} />}>
      <PageHeader title="Content without a rail" description="Useful for auth or focused workflows." />
    </AppLayout>
  ),
}
