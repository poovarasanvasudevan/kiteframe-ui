import type { Meta, StoryObj } from '@storybook/react'
import { useMap } from './useMap'
import { Button } from '../components/Button'
import { Flex } from '../components/Flex'

const meta: Meta = {
  title: 'Hooks/useMap',
  parameters: {
    docs: {
      description: {
        component: 'Reactive Map. Returns `[map, { set, setAll, remove, clear, reset, get }]`.',
      },
    },
  },
}
export default meta

function Demo() {
  const [map, { set, remove, clear, reset }] = useMap<string, number>([
    ['alpha', 1],
    ['beta', 2],
  ])
  return (
    <Flex direction="column" gap={3}>
      <Flex gap={2} wrap>
        <Button size="sm" onClick={() => set('gamma', 3)}>
          set gamma
        </Button>
        <Button size="sm" onClick={() => remove('alpha')}>
          remove alpha
        </Button>
        <Button size="sm" variant="ghost" onClick={clear}>
          clear
        </Button>
        <Button size="sm" variant="ghost" onClick={reset}>
          reset
        </Button>
      </Flex>
      <pre style={{ margin: 0, font: '400 11px/1.4 var(--kf-font-mono)', color: 'var(--kf-copy)' }}>
        {JSON.stringify([...map.entries()], null, 2)}
      </pre>
    </Flex>
  )
}

export const Default: StoryObj = { render: () => <Demo /> }
