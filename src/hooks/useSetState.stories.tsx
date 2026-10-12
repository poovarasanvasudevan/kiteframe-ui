import type { Meta, StoryObj } from '@storybook/react'
import { useSetState } from './useSetState'
import { Button } from '../components/Button'
import { Flex } from '../components/Flex'
import { TextField } from '../components/TextField'

const meta: Meta = {
  title: 'Hooks/useSetState',
  parameters: {
    docs: {
      description: {
        component: 'Object state updater. Pass a partial patch or a function returning a partial — merges onto the current object.',
      },
    },
  },
}
export default meta

function Demo() {
  const [state, setState] = useSetState({ name: 'Acme', seats: 3, active: true })
  return (
    <Flex direction="column" gap={3} style={{ maxWidth: 320 }}>
      <TextField
        label="Name"
        value={state.name}
        onChange={(e) => setState({ name: e.target.value })}
      />
      <Flex gap={2}>
        <Button size="sm" onClick={() => setState((s) => ({ seats: s.seats + 1 }))}>
          + seat
        </Button>
        <Button size="sm" onClick={() => setState({ active: !state.active })}>
          Toggle active
        </Button>
      </Flex>
      <pre style={{ margin: 0, font: '400 11px/1.4 var(--kf-font-mono)', color: 'var(--kf-copy)' }}>
        {JSON.stringify(state, null, 2)}
      </pre>
    </Flex>
  )
}

export const Default: StoryObj = { render: () => <Demo /> }
