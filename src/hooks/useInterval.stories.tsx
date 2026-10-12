import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useInterval } from './useInterval'
import { Button } from '../components/Button'
import { Flex } from '../components/Flex'

const meta: Meta = {
  title: 'Hooks/useInterval',
  parameters: {
    docs: {
      description: {
        component: 'Runs `callback` on an interval. Pass `delay: null` to pause. Callback identity can change without resetting the timer.',
      },
    },
  },
}
export default meta

function Demo() {
  const [count, setCount] = useState(0)
  const [running, setRunning] = useState(true)
  useInterval(() => setCount((c) => c + 1), running ? 500 : null)
  return (
    <Flex gap={3} align="center">
      <Button size="sm" onClick={() => setRunning((r) => !r)}>
        {running ? 'Pause' : 'Resume'}
      </Button>
      <Button size="sm" variant="ghost" onClick={() => setCount(0)}>
        Reset
      </Button>
      <span style={{ font: '600 16px/1 var(--kf-font)', color: 'var(--kf-ink)' }}>{count}</span>
    </Flex>
  )
}

export const Default: StoryObj = { render: () => <Demo /> }
