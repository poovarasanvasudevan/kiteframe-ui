import type { Meta, StoryObj } from '@storybook/react'
import { Stat, StatBar } from './Stat'

const meta: Meta<typeof Stat> = {
  title: 'Data/Stat',
  component: Stat,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Stat>

export const Single: Story = {
  args: { label: 'Unresolved', value: 55 },
}

export const DashboardBar: Story = {
  render: () => (
    <StatBar>
      <Stat label="Unresolved" value={55} />
      <Stat label="Overdue" value={4} />
      <Stat label="Due today" value={11} />
      <Stat label="Open" value={23} />
      <Stat label="On hold" value={7} />
      <Stat label="Unassigned" value={9} />
    </StatBar>
  ),
}
