import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Dialog, DialogFooter } from './Dialog'
import { Button } from './Button'
import { TextField } from './TextField'

const meta: Meta<typeof Dialog> = {
  title: 'Overlay/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Modal dialog centered over a scrim. Locks body scroll while open, closes on Escape or backdrop click. Sizes: `sm` | `md` | `lg`. Compose with `footer` or `DialogFooter`.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof Dialog>

function DialogDemo({
  size = 'md' as 'sm' | 'md' | 'lg',
  title = 'Move account',
  description = 'Enter the account domain URL to request ownership transfer.',
}: {
  size?: 'sm' | 'md' | 'lg'
  title?: string
  description?: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        size={size}
        title={title}
        description={description}
        footer={
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Move Account
            </Button>
          </DialogFooter>
        }
      >
        <TextField label="Account domain URL *" placeholder="acme.kiteframe.app" />
      </Dialog>
    </>
  )
}

export const Default: Story = {
  render: () => <DialogDemo />,
}

export const Small: Story = {
  render: () => <DialogDemo size="sm" title="Confirm" description="This action cannot be undone." />,
}

export const Large: Story = {
  render: () => <DialogDemo size="lg" />,
}

export const ConfirmDelete: Story = {
  name: 'Confirm delete',
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>
          Delete organization
        </Button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          size="sm"
          title="Delete organization?"
          description="All linked accounts will be detached. This cannot be undone."
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => setOpen(false)}>
                Delete
              </Button>
            </>
          }
        />
      </>
    )
  },
}
