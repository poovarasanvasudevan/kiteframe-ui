import type { Meta, StoryObj } from '@storybook/react'
import { createDataTableColumnHelper, DataTable, useDataTable } from '../components/datatable'
import { Flex } from '../components/Flex'

type Row = { id: string; name: string; seats: number }

const helper = createDataTableColumnHelper<Row>()
const columns = [
  helper.accessor('name', { header: 'Name' }),
  helper.accessor('seats', { header: 'Seats' }),
]

const data: Row[] = [
  { id: '1', name: 'Acme', seats: 12 },
  { id: '2', name: 'Globex', seats: 8 },
  { id: '3', name: 'Initech', seats: 24 },
]

const meta: Meta = {
  title: 'Hooks/useDataTable',
  parameters: {
    docs: {
      description: {
        component:
          'Builds a TanStack table instance for `DataTable`. Full examples live under **Data / DataTable**.',
      },
    },
  },
}
export default meta

function Demo() {
  const table = useDataTable({ data, columns, getRowId: (row) => row.id })
  return (
    <Flex direction="column" gap={2} style={{ maxWidth: 480 }}>
      <span style={{ font: '400 12px/1.4 var(--kf-font)', color: 'var(--kf-muted)' }}>
        Rows: {table.getRowModel().rows.length}
      </span>
      <DataTable table={table} />
    </Flex>
  )
}

export const Default: StoryObj = { render: () => <Demo /> }
