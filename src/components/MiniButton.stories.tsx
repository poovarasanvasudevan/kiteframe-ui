import type { Meta, StoryObj } from '@storybook/react'
import { Store } from 'lucide-react'
import { MiniButton, MiniButtonGroup } from './MiniButton'

/** Tiny clover mark matching the reference toolbar control. */
function CloverMark() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden focusable="false">
      <g fill="var(--kf-brand)">
        <circle cx="8" cy="4.6" r="3.4" />
        <circle cx="11.4" cy="8" r="3.4" />
        <circle cx="8" cy="11.4" r="3.4" />
        <circle cx="4.6" cy="8" r="3.4" />
      </g>
    </svg>
  )
}

const meta: Meta<typeof MiniButton> = {
  title: 'Forms/MiniButton',
  component: MiniButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Compact chip-style button with optional leading `icon` and trailing dropdown chevron (`dropdown`). Use `MiniButtonGroup` to stack several with dividers.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof MiniButton>

export const Default: Story = {
  args: {
    icon: <Store strokeWidth={1.75} />,
    children: 'Apps',
  },
}

export const WithDropdown: Story = {
  name: 'With dropdown',
  args: {
    icon: <CloverMark />,
    dropdown: true,
    children: 'Available',
  },
}

export const Group: Story = {
  name: 'Group (reference)',
  render: () => (
    <div style={{ padding: 16, background: 'var(--kf-paper)' }}>
      <MiniButtonGroup>
        <MiniButton icon={<Store strokeWidth={1.75} />}>Apps</MiniButton>
        <MiniButton icon={<CloverMark />} dropdown>
          Available
        </MiniButton>
      </MiniButtonGroup>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    icon: <Store strokeWidth={1.75} />,
    children: 'Apps',
    disabled: true,
  },
}
