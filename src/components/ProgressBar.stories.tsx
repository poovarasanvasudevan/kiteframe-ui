import type { Meta, StoryObj } from '@storybook/react'
import { Smile, Meh, Frown } from 'lucide-react'
import { ProgressBar } from './ProgressBar'
import { Card, CardBody, CardHeader, CardTitle } from './Card'

const meta: Meta<typeof ProgressBar> = {
  title: 'Data/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ProgressBar>

export const Basic: Story = {
  args: { label: 'Completion', value: 72, tone: 'accent' },
}

export const CustomerSatisfaction: Story = {
  render: () => (
    <Card style={{ maxWidth: 320 }}>
      <CardHeader>
        <CardTitle>Customer Satisfaction</CardTitle>
      </CardHeader>
      <CardBody style={{ display: 'grid', gap: 12 }}>
        <div style={{ font: '600 13px/1.3 var(--kf-font)', color: 'var(--kf-ink)' }}>
          320 Responses received
        </div>
        <ProgressBar label="Positive" icon={<Smile />} value={90} tone="success" />
        <ProgressBar label="Neutral" icon={<Meh />} value={2} tone="warning" />
        <ProgressBar label="Negative" icon={<Frown />} value={8} tone="danger" />
      </CardBody>
    </Card>
  ),
}
