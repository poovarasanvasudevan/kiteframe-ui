import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from './DatePicker'

const meta: Meta<typeof DatePicker> = {
  title: 'Forms/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ maxWidth: 320 }}><Story /></div>],
}
export default meta
type Story = StoryObj<typeof DatePicker>

export const Date: Story = { args: { label: 'Start date', defaultValue: '2026-10-09' } }
export const Week: Story = { args: { label: 'Reporting week', mode: 'week', placeholder: 'Choose a week…' } }
export const Month: Story = { args: { label: 'Billing month', mode: 'month', defaultValue: '2026-10' } }
export const Time: Story = { args: { label: 'Start time', mode: 'time', defaultValue: '09:30' } }
export const DateAndTime: Story = { args: { label: 'Scheduled for', mode: 'datetime', defaultValue: '2026-10-09T09:30', clearable: true } }
export const WithError: Story = { args: { label: 'Due date *', error: 'Choose a due date' } }
