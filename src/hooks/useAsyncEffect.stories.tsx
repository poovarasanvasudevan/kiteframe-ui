import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useAsyncEffect } from './useAsyncEffect'
import { Button } from '../components/Button'
import { Flex } from '../components/Flex'
import { Spinner } from '../components/Spinner'

const meta: Meta = {
  title: 'Hooks/useAsyncEffect',
  parameters: {
    docs: {
      description: {
        component:
          'Like `useEffect`, but the callback is async and receives an `AbortSignal`. Aborts on deps change / unmount.',
      },
    },
  },
}
export default meta

function Demo() {
  const [userId, setUserId] = useState(1)
  const [label, setLabel] = useState('…')
  const [loading, setLoading] = useState(true)

  useAsyncEffect(async (signal) => {
    setLoading(true)
    await new Promise((r) => window.setTimeout(r, 600))
    if (signal.aborted) return
    setLabel(`User ${userId}`)
    setLoading(false)
  }, [userId])

  return (
    <Flex direction="column" gap={3}>
      <Flex gap={2}>
        <Button size="sm" onClick={() => setUserId((n) => n + 1)}>
          Next user
        </Button>
      </Flex>
      <Flex gap={2} align="center">
        {loading ? <Spinner /> : null}
        <span style={{ font: '400 12px/1.4 var(--kf-font)', color: 'var(--kf-copy)' }}>{label}</span>
      </Flex>
    </Flex>
  )
}

export const Default: StoryObj = { render: () => <Demo /> }
