import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DateRangePicker, type DateRange } from './DateRangePicker'

const meta: Meta<typeof DateRangePicker> = {
  title: 'Forms/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Pick a start and end date (`YYYY-MM-DD`). First click sets start, second sets end (order is normalized). Hover previews the range. Use `numberOfMonths={1|2}`.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 560 }}>
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof DateRangePicker>

export const Default: Story = {
  args: {
    label: 'Reporting period',
    placeholder: 'Select date range…',
    clearable: true,
  },
}

export const WithValue: Story = {
  args: {
    label: 'Campaign window',
    defaultValue: { start: '2026-10-01', end: '2026-10-15' },
    hint: 'Inclusive of start and end dates.',
    clearable: true,
  },
}

export const SingleMonth: Story = {
  name: 'Single month',
  args: {
    label: 'Leave dates',
    numberOfMonths: 1,
    defaultValue: { start: '2026-10-06', end: '2026-10-10' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<DateRange>({
      start: '2026-09-20',
      end: '2026-10-05',
    })
    return (
      <div style={{ display: 'grid', gap: 12 }}>
        <DateRangePicker
          label="Filter by date"
          value={value}
          onValueChange={setValue}
          clearable
          min="2026-01-01"
          max="2026-12-31"
        />
        <span style={{ color: 'var(--kf-copy)', font: '400 12px/1.4 var(--kf-font)' }}>
          {value.start || '—'} → {value.end || '—'}
        </span>
      </div>
    )
  },
}

export const WithError: Story = {
  args: {
    label: 'Date range *',
    error: 'Choose a start and end date',
  },
}
