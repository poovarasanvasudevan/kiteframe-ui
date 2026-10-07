import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MoreHorizontal, Pencil, Trash2, Copy } from 'lucide-react'
import { Popover, PopoverItem } from './Popover'
import { Button } from './Button'

const meta: Meta<typeof Popover> = {
  title: 'Overlay/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Anchored floating panel for menus and lightweight content. Supports controlled / uncontrolled open state and `side` placement (`top` | `bottom` | `left` | `right`). Use `PopoverItem` for menu rows.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof Popover>

export const Menu: Story = {
  render: () => (
    <Popover
      trigger={
        <Button variant="secondary" iconOnly aria-label="More actions">
          <MoreHorizontal />
        </Button>
      }
    >
      <PopoverItem>
        <Pencil size={14} /> Edit
      </PopoverItem>
      <PopoverItem>
        <Copy size={14} /> Duplicate
      </PopoverItem>
      <PopoverItem>
        <Trash2 size={14} /> Delete
      </PopoverItem>
    </Popover>
  ),
}

export const Sides: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', padding: 48 }}>
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Popover
          key={side}
          side={side}
          trigger={<Button variant="secondary">Open {side}</Button>}
        >
          <div style={{ padding: 8, font: '500 12px/1.4 var(--kf-font)' }}>
            Placed on the <strong>{side}</strong>
          </div>
        </Popover>
      ))}
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Open popover
        </Button>
        <Popover
          open={open}
          onOpenChange={setOpen}
          trigger={<Button variant="secondary">Trigger</Button>}
        >
          <div style={{ padding: 8, maxWidth: 200, font: '400 12px/1.45 var(--kf-font)' }}>
            Controlled popover. Press Escape or click outside to close.
          </div>
        </Popover>
      </div>
    )
  },
}
