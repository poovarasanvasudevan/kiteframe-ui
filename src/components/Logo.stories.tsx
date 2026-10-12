import type { Meta, StoryObj } from '@storybook/react'
import { Building2, Headphones, KeyRound, Zap } from 'lucide-react'
import { Logo, LOGO_SHAPES } from './Logo'

const meta: Meta<typeof Logo> = {
  title: 'Content/Logo',
  component: Logo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Shaped brand mark. Pass `shape` (default `clover`), `backgroundColor`, and `icon`. Optional `label` for accessibility.',
      },
    },
  },
  argTypes: {
    shape: {
      control: 'select',
      options: [...LOGO_SHAPES],
    },
  },
}
export default meta
type Story = StoryObj<typeof Logo>

export const Default: Story = {
  args: {
    icon: <KeyRound strokeWidth={2.25} />,
    backgroundColor: '#22c55e',
    shape: 'clover',
    label: 'Workspace',
  },
}

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Logo icon={<Zap strokeWidth={2.25} />} backgroundColor="#22c55e" label="Green" />
      <Logo icon={<Headphones strokeWidth={2.25} />} backgroundColor="var(--kf-brand)" label="Brand" />
      <Logo icon={<Building2 strokeWidth={2.25} />} backgroundColor="var(--kf-accent)" label="Accent" />
      <Logo icon={<KeyRound strokeWidth={2.25} />} backgroundColor="var(--kf-warning)" label="Warning" />
      <Logo icon={<Zap strokeWidth={2.25} />} backgroundColor="var(--kf-rail)" label="Rail" />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Logo size="sm" icon={<KeyRound strokeWidth={2.5} />} backgroundColor="#22c55e" label="Small" />
      <Logo size="md" icon={<KeyRound strokeWidth={2.25} />} backgroundColor="#22c55e" label="Medium" />
      <Logo size="lg" icon={<KeyRound strokeWidth={2} />} backgroundColor="#22c55e" label="Large" />
    </div>
  ),
}

export const AllShapes: Story = {
  name: 'All shapes',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
        gap: 20,
        maxWidth: 520,
      }}
    >
      {LOGO_SHAPES.map((shape) => (
        <div
          key={shape}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            font: '500 11px/1.2 var(--kf-font)',
            color: 'var(--kf-copy)',
          }}
        >
          <Logo
            shape={shape}
            size="lg"
            icon={<KeyRound strokeWidth={2} />}
            backgroundColor="#12344d"
            label={shape}
          />
          <span>{shape}</span>
        </div>
      ))}
    </div>
  ),
}
