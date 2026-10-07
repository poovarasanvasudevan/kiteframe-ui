import type { Preview } from '@storybook/react'
import '../src/styles.css'

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    layout: 'padded',
    backgrounds: {
      default: 'paper',
      values: [
        { name: 'paper', value: '#f5f7f9' },
        { name: 'surface', value: '#ffffff' },
        { name: 'rail', value: '#12344d' },
      ],
    },
    docs: {
      toc: true,
      description: {
        component: 'KiteFrame UI components from `@kiteframe/ui`.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="kf-theme" style={{ minHeight: '100%', fontFamily: 'var(--kf-font)' }}>
        <Story />
      </div>
    ),
  ],
}

export default preview
