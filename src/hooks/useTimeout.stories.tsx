import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useTimeout } from './useTimeout'
import { Button } from '../components/Button'
import { Flex } from '../components/Flex'

const meta: Meta = {
  title: 'Hooks/useTimeout',
  parameters: {
    docs: {
      description: {
        component: 'One-shot timeout. Pass `delay: null` to cancel / idle. Remounts when delay changes.',
      },
    },
  },
}
export default meta

function Demo() {
  const [message, setMessage] = useState('Idle')
  const [delay, setDelay] = useState<number | null>(null)
  useTimeout(() => {
    setMessage('Fired!')
    setDelay(null)
  }, delay)
  return (
    <Flex direction="column" gap={3}>
      <Flex gap={2}>
        <Button
          size="sm"
          variant="primary"
          onClick={() => {
            setMessage('Waiting 2s…')
            setDelay(2000)
          }}
        >
          Start 2s
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setDelay(null)
            setMessage('Cancelled')
          }}
        >
          Cancel
        </Button>
      </Flex>
      <span style={{ font: '400 12px/1.4 var(--kf-font)', color: 'var(--kf-copy)' }}>{message}</span>
    </Flex>
  )
}

export const Default: StoryObj = { render: () => <Demo /> }
