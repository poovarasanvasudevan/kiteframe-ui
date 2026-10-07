import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumb } from './Breadcrumb'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Breadcrumb>

export const SecurityPath: Story = {
  args: {
    items: [
      { id: '1', label: 'Security', href: '#' },
      { id: '2', label: 'Accounts and Portals', current: true },
    ],
  },
}
