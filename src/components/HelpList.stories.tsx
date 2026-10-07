import type { Meta, StoryObj } from '@storybook/react'
import { HelpList, HelpListItem } from './HelpList'

const meta: Meta<typeof HelpList> = {
  title: 'Content/HelpList',
  component: HelpList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'List of help article links with book icons, typically inside `InfoPanel`.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof HelpList>

export const Default: Story = {
  render: () => (
    <HelpList title="Help articles">
      <HelpListItem href="#">What is an organization?</HelpListItem>
      <HelpListItem href="#">Manage organization admins</HelpListItem>
      <HelpListItem href="#">Move an account</HelpListItem>
    </HelpList>
  ),
}
