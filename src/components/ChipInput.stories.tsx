import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ChipInput } from './ChipInput'

const meta: Meta<typeof ChipInput> = {
  title: 'Forms/ChipInput',
  component: ChipInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Tag/chip text field. Type a value and press **Enter** or **comma** to add a chip; click ✕ or press **Backspace** on an empty input to remove. Supports controlled values, max count, tones, and standard field chrome (label, hint, error).',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof ChipInput>

export const Default: Story = {
  args: {
    label: 'Tags',
    placeholder: 'Add a tag…',
    hint: 'Press Enter or comma to add',
    defaultValue: ['knowledge', 'onboarding'],
  },
}

export const Controlled: Story = {
  render: () => {
    const [tags, setTags] = useState(['draft', 'review'])
    return (
      <div style={{ display: 'grid', gap: 12 }}>
        <ChipInput
          label="Article tags"
          value={tags}
          onValueChange={setTags}
          placeholder="Add tag…"
        />
        <code style={{ font: '500 11px/1.4 var(--kf-font-mono)', color: 'var(--kf-copy)' }}>
          {JSON.stringify(tags)}
        </code>
      </div>
    )
  },
}

export const AccentTone: Story = {
  args: {
    label: 'Topics',
    tone: 'accent',
    defaultValue: ['billing', 'security', 'api'],
  },
}

export const WithMax: Story = {
  args: {
    label: 'Keywords (max 3)',
    max: 3,
    defaultValue: ['help', 'search'],
    placeholder: 'One more…',
  },
}

export const WithError: Story = {
  args: {
    label: 'Recipients',
    defaultValue: ['invalid@'],
    error: 'Enter valid email addresses',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Locked tags',
    disabled: true,
    defaultValue: ['system', 'readonly'],
  },
}
