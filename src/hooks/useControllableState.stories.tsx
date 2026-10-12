import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useControllableState } from './useControllableState'
import { Button } from '../components/Button'
import { Flex } from '../components/Flex'

const meta: Meta = {
  title: 'Hooks/useControllableState',
  parameters: {
    docs: {
      description: {
        component:
          'Supports controlled (`value` + `onChange`) or uncontrolled (`defaultValue`) state. Used by Menu, Select, Collapse, and other open/value APIs.',
      },
    },
  },
}
export default meta
type Story = StoryObj

function UncontrolledDemo() {
  const [value, setValue] = useControllableState({ defaultValue: 'draft' })
  return (
    <Flex gap={2} align="center">
      <Button size="sm" onClick={() => setValue('draft')}>
        Draft
      </Button>
      <Button size="sm" variant="primary" onClick={() => setValue('published')}>
        Publish
      </Button>
      <span style={{ font: '400 12px/1.4 var(--kf-font)', color: 'var(--kf-copy)' }}>
        value: <strong>{value}</strong> (uncontrolled)
      </span>
    </Flex>
  )
}

function ControlledDemo() {
  const [outer, setOuter] = useState('a')
  const [value, setValue] = useControllableState({
    value: outer,
    defaultValue: 'a',
    onChange: setOuter,
  })
  return (
    <Flex direction="column" gap={2}>
      <Flex gap={2}>
        <Button size="sm" onClick={() => setValue('a')}>
          A
        </Button>
        <Button size="sm" onClick={() => setValue('b')}>
          B
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setOuter('c')}>
          Set from parent → C
        </Button>
      </Flex>
      <span style={{ font: '400 12px/1.4 var(--kf-font)', color: 'var(--kf-copy)' }}>
        value: <strong>{value}</strong> · parent: <strong>{outer}</strong>
      </span>
    </Flex>
  )
}

export const Uncontrolled: Story = { render: () => <UncontrolledDemo /> }
export const Controlled: Story = { render: () => <ControlledDemo /> }
