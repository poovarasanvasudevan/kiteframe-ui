import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardBody, CardFooter, CardTitle } from './Card'
import { Button } from './Button'

const meta: Meta<typeof Card> = {
  title: 'Layout/Card',
  component: Card,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Card>

export const Basic: Story = {
  render: () => (
    <Card style={{ maxWidth: 420 }}>
      <CardHeader>
        <CardTitle>My Accounts</CardTitle>
      </CardHeader>
      <CardBody>
        <p style={{ margin: 0, color: 'var(--kf-copy)', font: '400 12px/1.5 var(--kf-font)' }}>
          Accounts you administer appear here.
        </p>
      </CardBody>
      <CardFooter>
        <Button variant="primary" size="sm">Add account</Button>
      </CardFooter>
    </Card>
  ),
}

export const Flush: Story = {
  render: () => (
    <Card flush style={{ maxWidth: 420 }}>
      <CardBody>Flush card without outer padding chrome.</CardBody>
    </Card>
  ),
}
