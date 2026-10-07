import type { Meta, StoryObj } from '@storybook/react'
import { Building2 } from 'lucide-react'
import { UrlCard } from './UrlCard'
import { Button } from './Button'

const meta: Meta<typeof UrlCard> = {
  title: 'Content/UrlCard',
  component: UrlCard,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof UrlCard>

export const Default: Story = {
  args: {
    label: 'Current KiteFrame organization account URL',
    url: 'https://acme.kiteframe.app',
    action: <Button variant="secondary">Change Organization URL</Button>,
    illustration: <Building2 size={64} strokeWidth={1} />,
  },
}
