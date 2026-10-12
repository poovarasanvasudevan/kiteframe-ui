import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { LayoutDashboard, Settings } from 'lucide-react'
import { useCommandKShortcut } from '../components/CommandK'
import { CommandK, type CommandItem } from '../components/CommandK'
import { Button } from '../components/Button'
import { Flex } from '../components/Flex'

const meta: Meta = {
  title: 'Hooks/useCommandKShortcut',
  parameters: {
    docs: {
      description: {
        component: 'Registers ⌘K / Ctrl+K to toggle a callback. Pair with `CommandK`.',
      },
    },
  },
}
export default meta

function Demo() {
  const [open, setOpen] = useState(false)
  const [last, setLast] = useState<string | null>(null)
  useCommandKShortcut(() => setOpen((v) => !v))

  const items: CommandItem[] = [
    {
      id: 'dash',
      label: 'Go to dashboard',
      icon: <LayoutDashboard size={16} />,
      onSelect: () => setLast('Dashboard'),
    },
    {
      id: 'settings',
      label: 'Open settings',
      icon: <Settings size={16} />,
      onSelect: () => setLast('Settings'),
    },
  ]

  return (
    <Flex direction="column" gap={3}>
      <Flex gap={2} align="center">
        <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>
          Open palette
        </Button>
        <span style={{ font: '400 12px/1.4 var(--kf-font)', color: 'var(--kf-muted)' }}>
          or press ⌘K / Ctrl+K
        </span>
      </Flex>
      {last ? (
        <span style={{ font: '400 12px/1.4 var(--kf-font)', color: 'var(--kf-copy)' }}>
          Selected: <strong>{last}</strong>
        </span>
      ) : null}
      <CommandK open={open} onOpenChange={setOpen} items={items} />
    </Flex>
  )
}

export const Default: StoryObj = { render: () => <Demo /> }
