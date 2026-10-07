import type { Meta, StoryObj } from '@storybook/react'
import { InfoPanel, HelpList, HelpListItem } from './HelpList'

const meta: Meta<typeof InfoPanel> = {
  title: 'Layout/InfoPanel',
  component: InfoPanel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Right-hand “About” panel for contextual help. Use as the `aside` slot of `AppLayout`, or compose with `HelpList` / `HelpListItem`.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320, background: 'var(--kf-surface)', border: '1px solid var(--kf-rule)', padding: 16 }}>
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof InfoPanel>

export const AboutOrganization: Story = {
  args: {
    title: 'About Organization',
    children: (
      <>
        <p>Organizations let you manage multiple KiteFrame accounts from one place.</p>
        <ul>
          <li>Share security policies across accounts</li>
          <li>Centralize billing and user access</li>
        </ul>
        <HelpList title="Help articles">
          <HelpListItem href="#">What is an organization?</HelpListItem>
          <HelpListItem href="#">Manage organization admins</HelpListItem>
        </HelpList>
      </>
    ),
  },
}
