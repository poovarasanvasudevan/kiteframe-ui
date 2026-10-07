import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Drawer, DrawerFooter } from './Drawer'
import { Button } from './Button'
import { TextField, TextArea } from './TextField'
import { Switch } from './Switch'
import type { DrawerSide, DrawerSize } from './Drawer'

const meta: Meta<typeof Drawer> = {
  title: 'Overlay/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Slide-over panel for filters, record details, and secondary forms. Supports `side` (`left` | `right` | `top` | `bottom`) and `size` (`sm` | `md` | `lg` | `full`). Closes on Escape or backdrop click.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof Drawer>

function DrawerDemo({
  side = 'right',
  size = 'md',
  buttonLabel = 'Open drawer',
}: {
  side?: DrawerSide
  size?: DrawerSize
  buttonLabel?: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        {buttonLabel}
      </Button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        side={side}
        size={size}
        title="Account details"
        description="Review and update this KiteFrame account."
        footer={
          <DrawerFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Save
            </Button>
          </DrawerFooter>
        }
      >
        <div style={{ display: 'grid', gap: 14 }}>
          <TextField label="Account name" defaultValue="Knowledge Hub" />
          <TextField label="Domain URL" defaultValue="acme.kiteframe.app" />
          <TextArea label="Notes" rows={3} placeholder="Optional notes" />
          <Switch label="Apply org security policy" defaultChecked />
        </div>
      </Drawer>
    </>
  )
}

export const Right: Story = {
  render: () => <DrawerDemo side="right" />,
}

export const Left: Story = {
  render: () => <DrawerDemo side="left" buttonLabel="Open left drawer" />,
}

export const Bottom: Story = {
  render: () => <DrawerDemo side="bottom" size="md" buttonLabel="Open bottom drawer" />,
}

export const LargeFilters: Story = {
  name: 'Large filters',
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Filters
        </Button>
        <Drawer
          open={open}
          onOpenChange={setOpen}
          side="right"
          size="lg"
          title="Filter portals"
          description="Narrow the portals list by name, URL, or policy."
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Reset
              </Button>
              <Button variant="primary" onClick={() => setOpen(false)}>
                Apply
              </Button>
            </>
          }
        >
          <div style={{ display: 'grid', gap: 14 }}>
            <TextField label="Name contains" placeholder="Support" />
            <TextField label="URL contains" placeholder="kiteframe.app" />
            <Switch label="Custom policy only" />
            <Switch label="Active portals" defaultChecked />
          </div>
        </Drawer>
      </>
    )
  },
}
