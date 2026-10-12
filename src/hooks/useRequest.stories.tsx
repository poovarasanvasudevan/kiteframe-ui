import type { Meta, StoryObj } from '@storybook/react'
import { useRequest } from './useRequest'
import { Button } from '../components/Button'
import { Flex } from '../components/Flex'
import { Spinner } from '../components/Spinner'

const meta: Meta = {
  title: 'Hooks/useRequest',
  parameters: {
    docs: {
      description: {
        component:
          'Async request helper: `{ data, error, loading, run, cancel }`. Set `manual: true` to skip auto-run on mount.',
      },
    },
  },
}
export default meta

function fetchQuote(id: number) {
  return new Promise<{ id: number; text: string }>((resolve, reject) => {
    window.setTimeout(() => {
      if (id < 0) reject(new Error('Invalid id'))
      else resolve({ id, text: `Quote #${id} loaded` })
    }, 800)
  })
}

function Demo() {
  const { data, error, loading, run, cancel } = useRequest(fetchQuote, {
    manual: true,
  })
  return (
    <Flex direction="column" gap={3}>
      <Flex gap={2} align="center">
        <Button size="sm" variant="primary" disabled={loading} onClick={() => void run(42).catch(() => undefined)}>
          Load
        </Button>
        <Button size="sm" variant="ghost" onClick={cancel}>
          Cancel
        </Button>
        <Button
          size="sm"
          variant="danger-outline"
          disabled={loading}
          onClick={() => void run(-1).catch(() => undefined)}
        >
          Force error
        </Button>
        {loading ? <Spinner /> : null}
      </Flex>
      <span style={{ font: '400 12px/1.4 var(--kf-font)', color: 'var(--kf-copy)' }}>
        {error ? String((error as Error).message ?? error) : data ? data.text : 'Idle'}
      </span>
    </Flex>
  )
}

export const Default: StoryObj = { render: () => <Demo /> }
