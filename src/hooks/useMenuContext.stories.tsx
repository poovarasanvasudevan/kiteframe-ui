import type { Meta, StoryObj } from '@storybook/react'
import { Menu, MenuItem, useMenuContext } from '../components/Menu'
import { Button } from '../components/Button'
import { Flex } from '../components/Flex'

const meta: Meta = {
  title: 'Hooks/useMenuContext',
  parameters: {
    docs: {
      description: {
        component:
          'Access `{ close }` from inside `Menu` / `ContextMenu`. `MenuItem` already closes on select; use this for custom rows.',
      },
    },
  },
}
export default meta

function CustomRow() {
  const menu = useMenuContext()
  return (
    <button
      type="button"
      className="kf-menu__item"
      onClick={() => {
        // custom work…
        menu?.close()
      }}
    >
      Custom row (closes via useMenuContext)
    </button>
  )
}

export const Default: StoryObj = {
  render: () => (
    <Flex gap={3} align="center">
      <Menu trigger={<Button variant="secondary">Open menu</Button>} label="Demo">
        <MenuItem>Normal item</MenuItem>
        <CustomRow />
      </Menu>
      <span style={{ font: '400 12px/1.4 var(--kf-font)', color: 'var(--kf-muted)' }}>
        Custom row calls <code>useMenuContext().close()</code>
      </span>
    </Flex>
  ),
}
