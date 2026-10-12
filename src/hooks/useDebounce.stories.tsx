import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useDebounce } from './useDebounce'
import { TextField } from '../components/TextField'
import { Flex } from '../components/Flex'

const meta: Meta = {
  title: 'Hooks/useDebounce',
  parameters: {
    docs: {
      description: {
        component: 'Returns a debounced copy of `value` after `delay` ms (default 300).',
      },
    },
  },
}
export default meta

function Demo() {
  const [query, setQuery] = useState('')
  const debounced = useDebounce(query, 400)
  return (
    <Flex direction="column" gap={3} style={{ maxWidth: 320 }}>
      <TextField label="Search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Type…" />
      <span style={{ font: '400 12px/1.4 var(--kf-font)', color: 'var(--kf-copy)' }}>
        Live: <strong>{query || '—'}</strong>
        <br />
        Debounced: <strong>{debounced || '—'}</strong>
      </span>
    </Flex>
  )
}

export const Default: StoryObj = { render: () => <Demo /> }
