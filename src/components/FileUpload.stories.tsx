import type { Meta, StoryObj } from '@storybook/react'
import { FileUpload } from './FileUpload'

const meta: Meta<typeof FileUpload> = {
  title: 'Forms/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof FileUpload>

export const Icon: Story = {
  args: {
    label: 'Organization Icon',
    hint: 'Recommended: 200×200 px, square',
    accept: 'image/*',
  },
}

export const Logo: Story = {
  args: {
    label: 'Organization Logo',
    hint: 'Recommended: 400×100 px',
    accept: 'image/*',
  },
}

export const SideBySide: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 420 }}>
      <FileUpload label="Organization Icon" hint="200×200 px" accept="image/*" />
      <FileUpload label="Organization Logo" hint="400×100 px" accept="image/*" />
    </div>
  ),
}
