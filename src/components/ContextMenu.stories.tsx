import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Copy, Pencil, Share2, Trash2 } from 'lucide-react'
import { ContextMenu } from './ContextMenu'
import { IconMenuItem, MenuItem, MenuLabel, MenuSeparator } from './Menu'
import { Card, CardBody } from './Card'

const meta: Meta<typeof ContextMenu> = {
  title: 'Overlay/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Right-click menu at the pointer. Compose with the same `MenuItem`, `IconMenuItem`, `MenuLabel`, and `MenuSeparator` used by `Menu`. Closes on select, Escape, outside click, scroll, or resize.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof ContextMenu>

export const Basic: Story = {
  render: () => (
    <ContextMenu
      trigger={
        <Card style={{ maxWidth: 360, cursor: 'context-menu' }}>
          <CardBody>
            <strong style={{ display: 'block', marginBottom: 6 }}>Knowledge article</strong>
            <span style={{ color: 'var(--kf-copy)', font: '400 12px/1.45 var(--kf-font)' }}>
              Right-click this card for actions.
            </span>
          </CardBody>
        </Card>
      }
      label="Article actions"
    >
      <MenuItem>Open</MenuItem>
      <MenuItem>Duplicate</MenuItem>
      <MenuSeparator />
      <MenuItem destructive>Delete</MenuItem>
    </ContextMenu>
  ),
}

export const WithIcons: Story = {
  name: 'With IconMenuItem',
  render: () => {
    const [last, setLast] = useState<string | null>(null)
    return (
      <div style={{ display: 'grid', gap: 12 }}>
        <ContextMenu
          trigger={
            <div
              style={{
                padding: 24,
                border: '1px dashed var(--kf-rule-strong)',
                borderRadius: 'var(--kf-radius-md)',
                background: 'var(--kf-surface)',
                color: 'var(--kf-copy)',
                font: '400 13px/1.4 var(--kf-font)',
                cursor: 'context-menu',
              }}
            >
              Right-click anywhere in this area
            </div>
          }
        >
          <MenuLabel>Actions</MenuLabel>
          <IconMenuItem icon={<Pencil />} onClick={() => setLast('Edit')}>
            Edit
          </IconMenuItem>
          <IconMenuItem icon={<Copy />} onClick={() => setLast('Copy')}>
            Copy
          </IconMenuItem>
          <IconMenuItem icon={<Share2 />} onClick={() => setLast('Share')}>
            Share
          </IconMenuItem>
          <MenuSeparator />
          <IconMenuItem icon={<Trash2 />} destructive onClick={() => setLast('Delete')}>
            Delete
          </IconMenuItem>
        </ContextMenu>
        <span style={{ color: 'var(--kf-muted)', font: '400 12px/1.4 var(--kf-font)' }}>
          Last action: {last ?? '—'}
        </span>
      </div>
    )
  },
}

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div style={{ display: 'grid', gap: 8 }}>
        <ContextMenu
          open={open}
          onOpenChange={setOpen}
          trigger={
            <div
              style={{
                padding: 20,
                background: 'var(--kf-paper)',
                border: '1px solid var(--kf-rule)',
                borderRadius: 'var(--kf-radius-md)',
                cursor: 'context-menu',
                font: '400 13px/1.4 var(--kf-font)',
              }}
            >
              Controlled context menu (open: {String(open)})
            </div>
          }
        >
          <MenuItem onClick={() => setOpen(false)}>Close via item</MenuItem>
          <MenuItem>Keep selecting</MenuItem>
        </ContextMenu>
      </div>
    )
  },
}
