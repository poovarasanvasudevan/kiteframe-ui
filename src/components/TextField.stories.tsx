import type { Meta, StoryObj } from '@storybook/react'
import { TextField, TextArea } from './TextField'

const meta: Meta<typeof TextField> = {
  title: 'Forms/TextField',
  component: TextField,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: { label: 'Organization name *', defaultValue: 'Acme Corp' },
}

export const WithHint: Story = {
  args: {
    label: 'Account domain URL *',
    placeholder: 'acme.kiteframe.app',
    hint: 'Enter the full domain without https://',
  },
}

export const WithError: Story = {
  args: { label: 'Email', defaultValue: 'not-an-email', error: 'Enter a valid email address' },
}

export const Multiline: StoryObj<typeof TextArea> = {
  render: (args) => <TextArea {...args} />,
  args: { label: 'Address', rows: 3, placeholder: 'Street, city, country' },
}
