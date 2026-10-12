import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'

const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'review', label: 'In review' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived', disabled: true },
]

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Dropdown select with keyboard navigation (arrows, Home/End, Enter, Escape). Set `multiple` for multi-select (menu stays open; tags show in the trigger). For searchable lists use `FilteredSelect`.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    label: 'Status',
    placeholder: 'Choose status…',
    options: statusOptions,
  },
}

export const WithValue: Story = {
  args: {
    label: 'Status',
    defaultValue: 'published',
    options: statusOptions,
    hint: 'Published articles are visible to readers.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Category',
    options: [
      { value: 'guides', label: 'Guides' },
      { value: 'faq', label: 'FAQ' },
    ],
    error: 'Category is required',
  },
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('draft')
    return (
      <Select
        label="Workflow state"
        value={value}
        onValueChange={setValue}
        options={statusOptions}
      />
    )
  },
}

export const Disabled: Story = {
  args: {
    label: 'Owner',
    disabled: true,
    defaultValue: 'draft',
    options: statusOptions,
  },
}

export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['draft', 'review'])
    return (
      <Select
        multiple
        label="Statuses"
        placeholder="Choose statuses…"
        value={value}
        onValueChange={setValue}
        options={statusOptions}
        hint="Toggle options without closing the menu."
      />
    )
  },
}
