import { useMemo, useState, type ReactNode } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { Button } from './Button'
import { SearchBox } from './SearchBox'
import { Table, TBody, TD, TH, THead, TR } from './Table'
import { cx } from '../utils/cx'

export type DataTableProps<TData extends object> = {
  data: TData[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[]
  searchable?: boolean
  searchPlaceholder?: string
  pageSize?: number
  empty?: ReactNode
  className?: string
  toolbar?: ReactNode
  getRowId?: (row: TData, index: number) => string
}

export function DataTable<TData extends object>({
  data,
  columns,
  searchable = true,
  searchPlaceholder = 'Filter rows…',
  pageSize = 10,
  empty = 'No rows to show.',
  className,
  toolbar,
  getRowId,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId,
    initialState: { pagination: { pageSize } },
  })

  const pageCount = table.getPageCount()
  const pageIndex = table.getState().pagination.pageIndex
  const filteredCount = table.getFilteredRowModel().rows.length

  const sortIcon = useMemo(
    () => ({
      asc: <ArrowUp size={12} />,
      desc: <ArrowDown size={12} />,
      none: <ArrowUpDown size={12} />,
    }),
    [],
  )

  return (
    <div className={cx('kf-datatable', className)}>
      {(searchable || toolbar) && (
        <div className="kf-datatable__toolbar">
          {searchable ? (
            <SearchBox
              value={globalFilter}
              onChange={(event) => setGlobalFilter(event.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
            />
          ) : (
            <span />
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {toolbar}
            <span className="kf-datatable__meta">{filteredCount} rows</span>
          </div>
        </div>
      )}

      <Table>
        <THead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TR key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sorted = header.column.getIsSorted()
                const canSort = header.column.getCanSort()
                return (
                  <TH key={header.id} colSpan={header.colSpan} style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}>
                    {header.isPlaceholder ? null : canSort ? (
                      <button type="button" className="kf-datatable__sort" onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {sorted === 'asc' ? sortIcon.asc : sorted === 'desc' ? sortIcon.desc : sortIcon.none}
                      </button>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </TH>
                )
              })}
            </TR>
          ))}
        </THead>
        <TBody>
          {table.getRowModel().rows.length === 0 ? (
            <TR>
              <TD colSpan={columns.length}>
                <div className="kf-datatable__empty">{empty}</div>
              </TD>
            </TR>
          ) : (
            table.getRowModel().rows.map((row) => (
              <TR key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TD key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TD>
                ))}
              </TR>
            ))
          )}
        </TBody>
      </Table>

      {pageCount > 1 ? (
        <div className="kf-datatable__pager">
          <span className="kf-datatable__meta">
            Page {pageIndex + 1} of {pageCount}
          </span>
          <Button size="sm" variant="secondary" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
            Previous
          </Button>
          <Button size="sm" variant="secondary" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
            Next
          </Button>
        </div>
      ) : null}
    </div>
  )
}
