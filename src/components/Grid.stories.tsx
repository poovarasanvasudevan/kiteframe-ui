import type { CSSProperties } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Grid, GridItem } from './Grid'

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '12-column CSS grid (set `cols` 1–12). Use `GridItem` with `span` / `col` / `row` / `rowSpan` (1–12). Gaps use the same 0–12 scale as `Flex`.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof Grid>

const cell = (label: string, extra?: CSSProperties) => (
  <div
    style={{
      padding: 12,
      background: 'var(--kf-surface)',
      border: '1px solid var(--kf-rule-strong)',
      borderRadius: 'var(--kf-radius-sm)',
      font: '500 12px/1.3 var(--kf-font)',
      color: 'var(--kf-ink)',
      ...extra,
    }}
  >
    {label}
  </div>
)

export const TwelveColumn: Story = {
  name: '12-column spans',
  render: () => (
    <Grid cols={12} gap={3}>
      <GridItem span={12}>{cell('span 12')}</GridItem>
      <GridItem span={6}>{cell('span 6')}</GridItem>
      <GridItem span={6}>{cell('span 6')}</GridItem>
      <GridItem span={4}>{cell('span 4')}</GridItem>
      <GridItem span={4}>{cell('span 4')}</GridItem>
      <GridItem span={4}>{cell('span 4')}</GridItem>
      <GridItem span={3}>{cell('span 3')}</GridItem>
      <GridItem span={3}>{cell('span 3')}</GridItem>
      <GridItem span={3}>{cell('span 3')}</GridItem>
      <GridItem span={3}>{cell('span 3')}</GridItem>
    </Grid>
  ),
}

export const Offset: Story = {
  name: 'Column start',
  render: () => (
    <Grid cols={12} gap={3}>
      <GridItem span={4} col={3}>
        {cell('span 4 · col 3')}
      </GridItem>
      <GridItem span={4} col={8}>
        {cell('span 4 · col 8')}
      </GridItem>
    </Grid>
  ),
}

export const FourColumns: Story = {
  name: 'cols={4}',
  render: () => (
    <Grid cols={4} gap={4}>
      {Array.from({ length: 8 }, (_, i) => (
        <GridItem key={i}>{cell(`Cell ${i + 1}`)}</GridItem>
      ))}
    </Grid>
  ),
}

export const FormLayout: Story = {
  name: 'Form layout',
  render: () => (
    <Grid cols={12} gapX={3} gapY={3} style={{ maxWidth: 560 }}>
      <GridItem span={6}>{cell('First name')}</GridItem>
      <GridItem span={6}>{cell('Last name')}</GridItem>
      <GridItem span={12}>{cell('Email')}</GridItem>
      <GridItem span={8}>{cell('Address')}</GridItem>
      <GridItem span={4}>{cell('ZIP')}</GridItem>
    </Grid>
  ),
}
