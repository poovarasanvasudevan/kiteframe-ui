import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useShortcut } from './useShortcut'
import { Flex } from '../components/Flex'

const meta: Meta = {
  title: 'Hooks/useShortcut',
  parameters: {
    docs: {
      description: {
        component:
          'Listen for a key combo (`"meta+k"`, `"ctrl+s"`, `"shift+?"`). Skips editable fields unless `allowInInput` is true.',
      },
    },
  },
}
export default meta

function Demo() {
  const [last, setLast] = useState('Press Shift+/ or Ctrl+S')
  useShortcut('shift+/', () => setLast('Shift+/'))
  useShortcut('ctrl+s', () => setLast('Ctrl+S'))
  useShortcut('meta+s', () => setLast('⌘S'))
  return (
    <Flex direction="column" gap={2}>
      <p style={{ margin: 0, font: '400 13px/1.4 var(--kf-font)', color: 'var(--kf-copy)' }}>
        Focus this panel and try <kbd>Shift</kbd>+<kbd>/</kbd> or <kbd>Ctrl</kbd>/<kbd>⌘</kbd>+<kbd>S</kbd>.
      </p>
      <strong style={{ font: '600 13px/1.3 var(--kf-font)', color: 'var(--kf-ink)' }}>{last}</strong>
    </Flex>
  )
}

export const Default: StoryObj = { render: () => <Demo /> }
