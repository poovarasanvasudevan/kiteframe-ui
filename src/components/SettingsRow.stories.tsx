import type { Meta, StoryObj } from '@storybook/react'
import { KeyRound, Settings } from 'lucide-react'
import { SettingsRow, SettingsStat } from './SettingsRow'
import { StatusIndicator } from './StatusIndicator'
import { Card, CardBody } from './Card'

const meta: Meta<typeof SettingsRow> = {
  title: 'Data/SettingsRow',
  component: SettingsRow,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Card>
        <CardBody>
          <Story />
        </CardBody>
      </Card>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof SettingsRow>

export const WithStats: Story = {
  args: {
    icon: <Settings />,
    title: 'Accounts and Portals',
    description: 'This section lets you view the list of accounts and portals in your organization.',
    meta: (
      <>
        <SettingsStat value="4" label="Accounts" />
        <SettingsStat value="11" label="Portals" />
      </>
    ),
  },
}

export const WithStatusList: Story = {
  args: {
    icon: <KeyRound />,
    title: 'Default Login Methods',
    description: 'Configure how users sign in to KiteFrame products.',
    meta: (
      <>
        <StatusIndicator tone="success" icon="check" label="KiteFrame Login" />
        <StatusIndicator tone="success" icon="check" label="Google Login" />
        <StatusIndicator tone="danger" icon="cross" label="SSO Login" />
        <StatusIndicator tone="danger" icon="cross" label="Passwordless" />
      </>
    ),
  },
}

export const SecuritySettingsList: Story = {
  render: () => (
    <>
      <SettingsRow
        icon={<Settings />}
        title="Accounts and Portals"
        description="View and manage accounts and portals in your organization."
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
        description="Choose which login methods are available by default."
        meta={
          <>
            <StatusIndicator tone="success" icon="check" label="KiteFrame Login" />
            <StatusIndicator tone="success" icon="check" label="Google Login" />
            <StatusIndicator tone="danger" icon="cross" label="SSO Login" />
          </>
        }
      />
    </>
  ),
}
