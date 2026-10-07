import type { Meta, StoryObj } from '@storybook/react'
import { Gauge, Users, CreditCard, Shield, Building2, LayoutGrid } from 'lucide-react'
import { Sidebar, SidebarItem, SidebarFooterButton } from './Sidebar'

const meta: Meta<typeof Sidebar> = {
  title: 'Layout/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Dark navy icon rail used in the KiteFrame shell. Place inside `AppLayout` via the `sidebar` slot so the rail reserves horizontal space and does not overlap content.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', minHeight: 360, background: 'var(--kf-paper)' }}>
        <div style={{ width: 'var(--kf-rail-width)', flex: '0 0 auto' }}>
          <Story />
        </div>
        <div style={{ padding: 16, color: 'var(--kf-copy)', font: '400 12px/1.4 var(--kf-font)' }}>
          Main content sits beside the rail (not under it).
        </div>
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  render: () => (
    <Sidebar
      brand={<span className="kf-sidebar__mark">K</span>}
      footer={<SidebarFooterButton label="Apps" icon={<LayoutGrid />} />}
      style={{ position: 'sticky', height: '100%', width: '100%' }}
    >
      <SidebarItem href="#" label="Overview" icon={<Gauge />} />
      <SidebarItem href="#" label="Users" icon={<Users />} />
      <SidebarItem href="#" label="Billing" icon={<CreditCard />} />
      <SidebarItem href="#" label="Security" icon={<Shield />} active />
      <SidebarItem href="#" label="Organization" icon={<Building2 />} />
    </Sidebar>
  ),
}

export const WithBrandLabel: Story = {
  name: 'With brand label',
  render: () => (
    <Sidebar
      open
      brand={<span className="kf-sidebar__mark">K</span>}
      brandLabel="Kiteframe"
      style={{ position: 'relative', height: 360, width: 220, transform: 'none' }}
    >
      <SidebarItem href="#" label="Overview" icon={<Gauge />} active />
      <SidebarItem href="#" label="Users" icon={<Users />} />
    </Sidebar>
  ),
  decorators: [
    (Story) => (
      <div style={{ minHeight: 360, background: 'var(--kf-paper)', padding: 16 }}>
        <Story />
      </div>
    ),
  ],
}
