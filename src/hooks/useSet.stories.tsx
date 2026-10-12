import type { Meta, StoryObj } from '@storybook/react'
import { useSet } from './useSet'
import { Button } from '../components/Button'
import { Chip } from '../components/Chip'
import { Flex } from '../components/Flex'

const meta: Meta = {
  title: 'Hooks/useSet',
  parameters: {
    docs: {
      description: {
        component: 'Reactive Set. Returns `[set, { add, remove, toggle, clear, reset, has }]`.',
      },
    },
  },
}
export default meta

const tags = ['billing', 'security', 'members', 'api'] as const

function Demo() {
  const [selected, { toggle, clear, reset }] = useSet<string>(['billing'])
  return (
    <Flex direction="column" gap={3}>
      <Flex gap={2} wrap>
        {tags.map((tag) => (
          <Chip
            key={tag}
            tone={selected.has(tag) ? 'accent' : 'neutral'}
            style={{ cursor: 'pointer' }}
            onClick={() => toggle(tag)}
          >
            {tag}
          </Chip>
        ))}
      </Flex>
      <Flex gap={2}>
        <Button size="sm" variant="ghost" onClick={clear}>
          clear
        </Button>
        <Button size="sm" variant="ghost" onClick={reset}>
          reset
        </Button>
      </Flex>
      <span style={{ font: '400 12px/1.4 var(--kf-font)', color: 'var(--kf-copy)' }}>
        Selected: {[...selected].join(', ') || '—'}
      </span>
    </Flex>
  )
}

export const Default: StoryObj = { render: () => <Demo /> }
