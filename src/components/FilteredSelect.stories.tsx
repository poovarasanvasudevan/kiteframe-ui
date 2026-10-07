import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { BookOpen, FileText, Folder, Users, BarChart3 } from 'lucide-react'
import { FilteredSelect } from './FilteredSelect'

const workspaceOptions = [
  {
    value: 'knowledge',
    label: 'Knowledge Hub',
    description: 'acme.kiteframe.app',
    icon: <BookOpen />,
    keywords: 'kb docs',
  },
  {
    value: 'articles',
    label: 'Articles',
    description: 'Editorial workspace',
    icon: <FileText />,
  },
  {
    value: 'categories',
    label: 'Categories',
    description: 'Taxonomy & folders',
    icon: <Folder />,
  },
  {
    value: 'people',
    label: 'People & teams',
    description: 'Members and roles',
    icon: <Users />,
  },
  {
    value: 'analytics',
    label: 'Analytics',
    description: 'Usage reports',
    icon: <BarChart3 />,
  },
  {
    value: 'legacy',
    label: 'Legacy archive',
    description: 'Read-only',
    icon: <Folder />,
    disabled: true,
  },
]

const meta: Meta<typeof FilteredSelect> = {
  title: 'Forms/FilteredSelect',
  component: FilteredSelect,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Searchable select. Typing in the filter field narrows options by label, description, keywords, or value. Supports icons, descriptions, and the same field chrome as `Select` (label, hint, error).',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof FilteredSelect>

export const Default: Story = {
  args: {
    label: 'Workspace',
    placeholder: 'Choose a workspace…',
    filterPlaceholder: 'Search workspaces…',
    options: workspaceOptions,
  },
}

export const WithSelection: Story = {
  args: {
    label: 'Workspace',
    defaultValue: 'articles',
    options: workspaceOptions,
    hint: 'Switching workspace reloads navigation.',
  },
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('knowledge')
    return (
      <FilteredSelect
        label="Move article to"
        value={value}
        onValueChange={setValue}
        options={workspaceOptions}
        filterPlaceholder="Filter by name…"
      />
    )
  },
}

export const EmptyFilter: Story = {
  name: 'Empty filter result',
  args: {
    label: 'Category',
    options: [
      { value: 'a', label: 'Alpha' },
      { value: 'b', label: 'Beta' },
    ],
    emptyMessage: 'No categories match',
    filterPlaceholder: 'Try typing “zzz”…',
  },
}
