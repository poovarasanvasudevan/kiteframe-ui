import type { Meta, StoryObj } from '@storybook/react'
import { Lock } from 'lucide-react'
import { SectionHeader } from './SectionHeader'

const meta: Meta<typeof SectionHeader> = {
  title: 'Layout/SectionHeader',
  component: SectionHeader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Section title + description with an optional right-side illustration slot.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof SectionHeader>

export const Default: Story = {
  args: {
    title: 'Signing in to KiteFrame',
    description: 'Choose default login methods and view accounts linked to this organization.',
  },
}

export const WithIllustration: Story = {
  args: {
    title: 'Signing in to KiteFrame',
    description: 'Configure how users authenticate across products.',
    illustration: <Lock size={48} strokeWidth={1.25} />,
  },
}
