import type { Meta, StoryObj } from '@storybook/react'
import { TextField, TextArea } from './TextField'
import { FileUpload } from './FileUpload'
import { Button } from './Button'
import { UrlCard } from './UrlCard'
import { Card, CardBody } from './Card'

/**
 * Composition example — see Forms/* for individual component docs.
 */
const meta: Meta = {
  title: 'Patterns/Organization form',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Example page composing TextField, TextArea, FileUpload, UrlCard, and Button. Individual controls have their own docs under Forms/.',
      },
    },
  },
}
export default meta

export const Default: StoryObj = {
  render: () => (
    <Card style={{ maxWidth: 640 }}>
      <CardBody style={{ display: 'grid', gap: 16 }}>
        <TextField label="Organization name *" defaultValue="Acme Corp" />
        <TextArea label="Address" rows={3} placeholder="Street, city, country" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <FileUpload label="Organization Icon" hint="Recommended: 200×200 px, square" accept="image/*" />
          <FileUpload label="Organization Logo" hint="Recommended: 400×100 px" accept="image/*" />
        </div>
        <UrlCard
          label="Current KiteFrame organization account URL"
          url="https://acme.kiteframe.app"
          action={<Button variant="secondary">Change Organization URL</Button>}
        />
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="primary">Save</Button>
          <Button variant="ghost">Cancel</Button>
          <Button variant="danger-outline" style={{ marginLeft: 'auto' }}>
            Delete Organization
          </Button>
        </div>
      </CardBody>
    </Card>
  ),
}
