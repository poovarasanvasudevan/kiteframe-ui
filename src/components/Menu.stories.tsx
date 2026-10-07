import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Copy, MoreHorizontal, Pencil, Share2, Trash2, Archive } from 'lucide-react'
import { Menu, MenuItem, IconMenuItem, MenuSeparator, MenuLabel } from './Menu'
import { Button } from './Button'

const meta: Meta<typeof Menu> = {
  title: 'Overlay/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Action menu anchored to a trigger. Use `MenuItem` for text rows, `IconMenuItem` for icon + label rows, plus optional `MenuLabel` / `MenuSeparator`. Closes on Escape, outside click, or item select.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof Menu>

export const Basic: Story = {
  render: () => (
    <Menu trigger={<Button variant="secondary">Actions</Button>}>
      <MenuItem>Edit</MenuItem>
      <MenuItem>Duplicate</MenuItem>
      <MenuSeparator />
      <MenuItem destructive>Delete</MenuItem>
    </Menu>
  ),
}

export const WithIcons: Story = {
  name: 'With IconMenuItem',
  render: () => (
    <Menu
      trigger={
        <Button variant="secondary" iconOnly aria-label="More actions">
          <MoreHorizontal />
        </Button>
      }
      label="Article actions"
    >
      <MenuLabel>Article</MenuLabel>
      <IconMenuItem icon={<Pencil />}>Edit</IconMenuItem>
      <IconMenuItem icon={<Copy />}>Duplicate</IconMenuItem>
      <IconMenuItem icon={<Share2 />}>Share</IconMenuItem>
      <MenuSeparator />
      <IconMenuItem icon={<Archive />}>Archive</IconMenuItem>
      <IconMenuItem icon={<Trash2 />} destructive>
        Delete
      </IconMenuItem>
    </Menu>
  ),
}

export const AlignEnd: Story = {
  name: 'Align end',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Menu
        align="end"
        trigger={<Button variant="primary">New</Button>}
      >
        <IconMenuItem icon={<Pencil />}>Article</IconMenuItem>
        <IconMenuItem icon={<Copy />}>Category</IconMenuItem>
      </Menu>
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [last, setLast] = useState<string | null>(null)
    return (
      <div style={{ display: 'grid', gap: 12 }}>
        <Menu open={open} onOpenChange={setOpen} trigger={<Button variant="secondary">Open menu</Button>}>
          <MenuItem onClick={() => setLast('Edit')}>Edit</MenuItem>
          <MenuItem onClick={() => setLast('Share')}>Share</MenuItem>
        </Menu>
        <span style={{ color: 'var(--kf-copy)', font: '400 12px/1.4 var(--kf-font)' }}>
          Open: {String(open)} · Last action: {last ?? '—'}
        </span>
      </div>
    )
  },
}
