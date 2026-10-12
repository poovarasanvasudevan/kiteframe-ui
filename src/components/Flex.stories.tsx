import type { Meta, StoryObj } from '@storybook/react'
import { Flex } from './Flex'
import { Button } from './Button'

const meta: Meta<typeof Flex> = {
  title: 'Layout/Flex',
  component: Flex,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Flexbox helper. `gap` / `gapX` / `gapY` use the 0–12 scale (`N × 4px × density`). Supports `direction`, `align`, `justify`, `wrap`, and `inline`.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof Flex>

const box = (label: string) => (
  <div
    style={{
      padding: '8px 12px',
      background: 'var(--kf-surface-2)',
      border: '1px solid var(--kf-rule)',
      borderRadius: 'var(--kf-radius-sm)',
      font: '500 12px/1.2 var(--kf-font)',
      color: 'var(--kf-ink)',
    }}
  >
    {label}
  </div>
)

export const Row: Story = {
  render: () => (
    <Flex gap={3} align="center">
      {box('One')}
      {box('Two')}
      {box('Three')}
    </Flex>
  ),
}

export const Between: Story = {
  render: () => (
    <Flex gap={2} align="center" justify="between" style={{ width: '100%' }}>
      <strong style={{ font: '600 13px/1.2 var(--kf-font)', color: 'var(--kf-ink)' }}>Title</strong>
      <Flex gap={2}>
        <Button size="sm" variant="ghost">
          Cancel
        </Button>
        <Button size="sm" variant="primary">
          Save
        </Button>
      </Flex>
    </Flex>
  ),
}

export const Column: Story = {
  render: () => (
    <Flex direction="column" gap={2} style={{ maxWidth: 240 }}>
      {box('Stack A')}
      {box('Stack B')}
      {box('Stack C')}
    </Flex>
  ),
}

export const Wrap: Story = {
  render: () => (
    <Flex gap={2} wrap style={{ maxWidth: 280 }}>
      {Array.from({ length: 8 }, (_, i) => box(`Item ${i + 1}`))}
    </Flex>
  ),
}

export const GapScale: Story = {
  name: 'Gap scale 0–12',
  render: () => (
    <Flex direction="column" gap={4}>
      {([0, 2, 4, 6, 8, 12] as const).map((g) => (
        <div key={g}>
          <div style={{ marginBottom: 4, font: '500 11px/1.2 var(--kf-font)', color: 'var(--kf-muted)' }}>
            gap={g}
          </div>
          <Flex gap={g}>
            {box('A')}
            {box('B')}
            {box('C')}
          </Flex>
        </div>
      ))}
    </Flex>
  ),
}
