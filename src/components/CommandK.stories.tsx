import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  FilePlus,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from 'lucide-react'
import { CommandK, useCommandKShortcut, type CommandItem } from './CommandK'
import { SearchTrigger } from './SearchBox'
import { Button } from './Button'

const meta: Meta<typeof CommandK> = {
  title: 'Overlay/CommandK',
  component: CommandK,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Command palette overlay (⌘K / Ctrl+K). Filterable grouped list with keyboard navigation. Pair with `SearchTrigger` and `useCommandKShortcut`.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof CommandK>

function demoItems(onRun: (label: string) => void): CommandItem[] {
  return [
    {
      id: 'dashboard',
      label: 'Go to dashboard',
      group: 'Navigation',
      icon: <LayoutDashboard size={16} />,
      shortcut: 'G D',
      onSelect: () => onRun('Go to dashboard'),
    },
    {
      id: 'settings',
      label: 'Open settings',
      group: 'Navigation',
      icon: <Settings size={16} />,
      shortcut: 'G S',
      keywords: 'preferences config',
      onSelect: () => onRun('Open settings'),
    },
    {
      id: 'profile',
      label: 'View profile',
      group: 'Navigation',
      icon: <User size={16} />,
      onSelect: () => onRun('View profile'),
    },
    {
      id: 'new-file',
      label: 'Create new file',
      group: 'Actions',
      icon: <FilePlus size={16} />,
      shortcut: '⌘ N',
      onSelect: () => onRun('Create new file'),
    },
    {
      id: 'open',
      label: 'Open folder',
      group: 'Actions',
      icon: <FolderOpen size={16} />,
      onSelect: () => onRun('Open folder'),
    },
    {
      id: 'sign-out',
      label: 'Sign out',
      group: 'Account',
      icon: <LogOut size={16} />,
      onSelect: () => onRun('Sign out'),
    },
  ]
}

function CommandKDemo() {
  const [open, setOpen] = useState(false)
  const [last, setLast] = useState<string | null>(null)
  const items = demoItems((label) => setLast(label))

  useCommandKShortcut(() => setOpen((value) => !value))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
      <SearchTrigger
        placeholder="Search commands…"
        onClick={() => setOpen(true)}
      />
      <p style={{ margin: 0, font: '400 13px/1.45 var(--kf-font)', color: 'var(--kf-muted)' }}>
        Click the search trigger or press <kbd>⌘</kbd>/<kbd>Ctrl</kbd>+<kbd>K</kbd>.
        {last ? (
          <>
            {' '}
            Last selected: <strong>{last}</strong>
          </>
        ) : null}
      </p>
      <CommandK open={open} onOpenChange={setOpen} items={items} />
    </div>
  )
}

export const Default: Story = {
  render: () => <CommandKDemo />,
}

export const Opened: Story = {
  name: 'Opened',
  render: () => {
    const [open, setOpen] = useState(true)
    const [last, setLast] = useState<string | null>(null)
    const items = demoItems((label) => setLast(label))

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Reopen palette
        </Button>
        {last ? (
          <p style={{ margin: 0, font: '400 13px/1.45 var(--kf-font)' }}>
            Selected: <strong>{last}</strong>
          </p>
        ) : null}
        <CommandK open={open} onOpenChange={setOpen} items={items} />
      </div>
    )
  },
}

export const EmptyState: Story = {
  name: 'Empty filter',
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Open palette
        </Button>
        <CommandK
          open={open}
          onOpenChange={setOpen}
          items={[]}
          emptyText="No commands available."
        />
      </>
    )
  },
}
