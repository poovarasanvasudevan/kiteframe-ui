import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Pagination>

export const Interactive: Story = {
  render: () => {
    const [page, setPage] = useState(2)
    return <Pagination page={page} pageCount={8} onPageChange={setPage} />
  },
}
