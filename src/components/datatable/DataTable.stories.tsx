import { useMemo, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import type { CellContext, Row, RowSelectionState } from '@tanstack/react-table'
import { Badge } from '../Badge'
import { Button } from '../Button'
import {
  DataTable,
  createDataTableColumnHelper,
  useDataTable,
  type DataTableColumnDef,
} from './index'

type Person = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: 'Admin' | 'Editor' | 'Viewer'
  status: 'Active' | 'Invited' | 'Disabled'
  age: number
  city: string
}

const roles = ['Admin', 'Editor', 'Viewer'] as const
const statuses = ['Active', 'Invited', 'Disabled'] as const
const cities = ['Bengaluru', 'London', 'Austin', 'Singapore', 'Berlin', 'Toronto']

function makePeople(count: number): Person[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `p-${i + 1}`,
    firstName: ['Ava', 'Noah', 'Mia', 'Leo', 'Zoe', 'Eli'][i % 6],
    lastName: ['Chen', 'Patel', 'Nguyen', 'Garcia', 'Kim', 'Ross'][i % 6],
    email: `user${i + 1}@kiteframe.dev`,
    role: roles[i % roles.length],
    status: statuses[i % statuses.length],
    age: 22 + (i % 30),
    city: cities[i % cities.length],
  }))
}

const sampleData = makePeople(42)
const columnHelper = createDataTableColumnHelper<Person>()

const baseColumns: DataTableColumnDef<Person>[] = columnHelper.columns([
  columnHelper.accessor('firstName', { header: 'First name' }),
  columnHelper.accessor('lastName', { header: 'Last name' }),
  columnHelper.accessor('email', { header: 'Email' }),
  {
    ...columnHelper.accessor('role', {
      header: 'Role',
      cell: (info: CellContext<Person, Person['role']>) => (
        <Badge tone="neutral">{info.getValue()}</Badge>
      ),
    }),
    filterVariant: 'select',
    filterSelectOptions: roles.map((role) => ({ label: role, value: role })),
  },
  {
    ...columnHelper.accessor('status', {
      header: 'Status',
      cell: (info: CellContext<Person, Person['status']>) => {
        const value = info.getValue()
        const tone = value === 'Active' ? 'success' : value === 'Invited' ? 'warning' : 'neutral'
        return <Badge tone={tone}>{value}</Badge>
      },
    }),
    filterVariant: 'select',
    filterSelectOptions: statuses.map((status) => ({ label: status, value: status })),
  },
  columnHelper.accessor('age', { header: 'Age' }),
  columnHelper.accessor('city', { header: 'City' }),
])

const meta: Meta<typeof DataTable<Person>> = {
  title: 'Data/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'KiteFrame DataTable built on TanStack Table with a Material React Table–style `useDataTable` + `<DataTable table={table} />` API. Supports sorting, filtering, pagination, selection, column visibility/order/resize/pin, expand/detail panels, density, sticky header, row numbers, fullscreen, virtualization, and loading/empty states.',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof DataTable<Person>>

export const Default: Story = {
  args: {
    columns: baseColumns,
    data: sampleData,
    searchPlaceholder: 'Search people…',
  },
}

export const CompactDensity: Story = {
  args: {
    columns: baseColumns,
    data: sampleData,
    initialState: { density: 'compact' },
  },
}

export const SpaciousDensity: Story = {
  args: {
    columns: baseColumns,
    data: sampleData,
    initialState: { density: 'spacious' },
  },
}

export const RowSelection: Story = {
  render: function RowSelectionStory() {
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
    return (
      <DataTable
        columns={baseColumns}
        data={sampleData}
        enableRowSelection
        state={{ rowSelection }}
        onRowSelectionChange={setRowSelection}
        getRowId={(row) => row.id}
        toolbar={
          <Button size="sm" variant="secondary" disabled={Object.keys(rowSelection).length === 0}>
            Bulk edit ({Object.keys(rowSelection).length})
          </Button>
        }
      />
    )
  },
}

export const ColumnFilters: Story = {
  args: {
    columns: baseColumns,
    data: sampleData,
    enableColumnFilters: true,
    enableGlobalFilter: true,
  },
}

export const ColumnResizing: Story = {
  args: {
    columns: baseColumns,
    data: sampleData,
    enableColumnResizing: true,
  },
}

export const ColumnPinningAndOrdering: Story = {
  args: {
    columns: baseColumns,
    data: sampleData,
    enableColumnPinning: true,
    enableColumnOrdering: true,
    initialState: {
      columnPinning: { left: ['firstName'] },
    },
  },
}

export const RowNumbers: Story = {
  args: {
    columns: baseColumns,
    data: sampleData,
    enableRowNumbers: true,
  },
}

export const DetailPanel: Story = {
  args: {
    columns: baseColumns.slice(0, 5),
    data: sampleData.slice(0, 12),
    renderDetailPanel: ({ row }: { row: Row<Person> }) => (
      <div style={{ display: 'grid', gap: 4 }}>
        <strong>
          {row.original.firstName} {row.original.lastName}
        </strong>
        <span>{row.original.email}</span>
        <span>
          {row.original.role} · {row.original.city} · age {row.original.age}
        </span>
      </div>
    ),
  },
}

export const Loading: Story = {
  args: {
    columns: baseColumns,
    data: [],
    isLoading: true,
  },
}

export const Empty: Story = {
  args: {
    columns: baseColumns,
    data: [],
    empty: 'No people match your filters.',
  },
}

export const NoPagination: Story = {
  args: {
    columns: baseColumns,
    data: sampleData.slice(0, 8),
    enablePagination: false,
    enableBottomToolbar: false,
  },
}

export const MinimalToolbar: Story = {
  args: {
    columns: baseColumns,
    data: sampleData.slice(0, 15),
    enableTopToolbar: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableColumnVisibility: false,
  },
}

export const ClickableRows: Story = {
  args: {
    columns: baseColumns,
    data: sampleData.slice(0, 20),
    onRowClick: (row: Row<Person>) => {
      // eslint-disable-next-line no-alert
      alert(`Clicked ${row.original.firstName} ${row.original.lastName}`)
    },
  },
}

export const Virtualized: Story = {
  args: {
    columns: baseColumns,
    data: makePeople(500),
    enableRowVirtualization: true,
    enablePagination: false,
    enableBottomToolbar: false,
    defaultPageSize: 500,
  },
}

export const HookApi: Story = {
  render: function HookApiStory() {
    const columns = useMemo(() => baseColumns, [])
    const table = useDataTable({
      columns,
      data: sampleData,
      enableRowSelection: true,
      enableColumnFilters: true,
      enableColumnResizing: true,
      enableColumnPinning: true,
      enableColumnOrdering: true,
      enableRowNumbers: true,
      renderDetailPanel: ({ row }) => (
        <p style={{ margin: 0 }}>Detail for {row.original.email}</p>
      ),
      getRowId: (row) => row.id,
    })

    return <DataTable table={table} searchPlaceholder="Filter via hook…" />
  },
}

export const KitchenSink: Story = {
  render: function KitchenSinkStory() {
    const table = useDataTable({
      columns: baseColumns,
      data: sampleData,
      enableRowSelection: true,
      enableColumnFilters: true,
      enableColumnResizing: true,
      enableColumnPinning: true,
      enableColumnOrdering: true,
      enableRowNumbers: true,
      enableMultiSort: true,
      renderDetailPanel: ({ row }) => (
        <div>
          Full profile for <strong>{row.original.email}</strong> in {row.original.city}.
        </div>
      ),
      initialState: {
        sorting: [{ id: 'lastName', desc: false }],
        columnPinning: { left: ['kf-select', 'kf-expand', 'kf-row-number', 'firstName'] },
      },
      getRowId: (row) => row.id,
    })

    return (
      <DataTable
        table={table}
        toolbar={<Button size="sm">Export</Button>}
        searchPlaceholder="Search everything…"
      />
    )
  },
}
