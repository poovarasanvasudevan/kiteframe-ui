import { useMemo, useRef, type CSSProperties, type ReactNode } from 'react'
import { flexRender, type Column, type Row, type Table as TanStackTable } from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
  ChevronRight,
  Columns3,
  Maximize2,
  Minimize2,
  Pin,
  Rows3,
} from 'lucide-react'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { EmptyState } from '../EmptyState'
import { Menu, MenuItem, MenuLabel, MenuSeparator } from '../Menu'
import { SearchBox } from '../SearchBox'
import { Select } from '../Select'
import { Spinner } from '../Spinner'
import { cx } from '../../utils/cx'
import { useDataTable } from './useDataTable'
import type {
  DataTableColumnDef,
  DataTableDensity,
  DataTableInstance,
  DataTableMeta,
  UseDataTableOptions,
} from './types'

type MetaKind = { kind?: string; align?: 'left' | 'center' | 'right' }

function getMeta<TData extends object>(table: TanStackTable<TData>) {
  return table.options.meta as DataTableMeta<TData> | undefined
}

function colMeta(column: Column<any, unknown>): MetaKind {
  return (column.columnDef.meta ?? {}) as MetaKind
}

function alignClass(align?: string) {
  if (align === 'center') return 'kf-datatable__cell--center'
  if (align === 'right') return 'kf-datatable__cell--right'
  return undefined
}

function pinStyle(column: Column<any, unknown>): CSSProperties | undefined {
  const pinned = column.getIsPinned()
  if (!pinned) return undefined
  return {
    position: 'sticky',
    left: pinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: pinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    zIndex: 2,
  }
}

type ViewProps<TData extends object> = {
  table: DataTableInstance<TData>
  empty?: ReactNode
  className?: string
  toolbar?: ReactNode
  searchPlaceholder?: string
}

export type DataTableProps<TData extends object> =
  | (ViewProps<TData> & { data?: never; columns?: never })
  | (UseDataTableOptions<TData> & {
      table?: never
      searchable?: boolean
      searchPlaceholder?: string
      pageSize?: number
      empty?: ReactNode
      className?: string
      toolbar?: ReactNode
    })

/** KiteFrame data table — Material React Table–style features on TanStack Table. */
export function DataTable<TData extends object>(props: DataTableProps<TData>) {
  if ('table' in props && props.table) {
    return (
      <DataTableView
        table={props.table}
        empty={props.empty}
        className={props.className}
        toolbar={props.toolbar}
        searchPlaceholder={props.searchPlaceholder}
      />
    )
  }

  const { table: _table, ...options } = props as UseDataTableOptions<TData> & {
    table?: never
    searchable?: boolean
    searchPlaceholder?: string
    pageSize?: number
    empty?: ReactNode
    className?: string
    toolbar?: ReactNode
  }
  return <DataTableFromOptions {...options} />
}

function DataTableFromOptions<TData extends object>(
  props: UseDataTableOptions<TData> & {
    searchable?: boolean
    searchPlaceholder?: string
    pageSize?: number
    empty?: ReactNode
    className?: string
    toolbar?: ReactNode
  },
) {
  const {
    searchable,
    searchPlaceholder,
    pageSize,
    empty,
    className,
    toolbar,
    enableGlobalFilter,
    defaultPageSize,
    ...options
  } = props

  const table = useDataTable({
    ...options,
    enableGlobalFilter: searchable ?? enableGlobalFilter ?? true,
    defaultPageSize: pageSize ?? defaultPageSize ?? 10,
  })

  return (
    <DataTableView
      table={table}
      empty={empty}
      className={className}
      toolbar={toolbar}
      searchPlaceholder={searchPlaceholder}
    />
  )
}

function DataTableView<TData extends object>({
  table,
  empty = 'No rows to show.',
  className,
  toolbar,
  searchPlaceholder = 'Search…',
}: ViewProps<TData>) {
  const meta = getMeta(table)!
  const density = meta.density
  const rows = table.getRowModel().rows
  const scrollRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: meta.enableRowVirtualization ? rows.length : 0,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => (density === 'compact' ? 36 : density === 'spacious' ? 56 : 44),
    overscan: 8,
    enabled: meta.enableRowVirtualization,
  })

  const virtualRows = meta.enableRowVirtualization ? virtualizer.getVirtualItems() : null
  const paddingTop = virtualRows?.length ? virtualRows[0].start : 0
  const paddingBottom = virtualRows?.length
    ? virtualizer.getTotalSize() - virtualRows[virtualRows.length - 1].end
    : 0

  const selectedCount = table.getSelectedRowModel().rows.length
  const filteredCount = table.getFilteredRowModel().rows.length
  const pageCount = table.getPageCount()
  const { pageIndex, pageSize } = table.getState().pagination

  const densityCycle = useMemo(() => {
    const order: DataTableDensity[] = ['compact', 'comfortable', 'spacious']
    return () => {
      const idx = order.indexOf(density)
      meta.setDensity(order[(idx + 1) % order.length])
    }
  }, [density, meta])

  const leafColumns = table.getAllLeafColumns().filter((c) => !String(c.id).startsWith('kf-'))

  return (
    <div
      className={cx(
        'kf-datatable',
        `kf-datatable--${density}`,
        meta.isFullScreen && 'kf-datatable--fullscreen',
        className,
      )}
    >
      {meta.enableTopToolbar ? (
        <div className="kf-datatable__toolbar">
          <div className="kf-datatable__toolbar-left">
            {meta.enableGlobalFilter ? (
              <SearchBox
                value={table.getState().globalFilter ?? ''}
                onChange={(event) => table.setGlobalFilter(event.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
              />
            ) : null}
            {selectedCount > 0 ? (
              <span className="kf-datatable__meta">{selectedCount} selected</span>
            ) : null}
          </div>
          <div className="kf-datatable__toolbar-right">
            {toolbar}
            <span className="kf-datatable__meta">{filteredCount} rows</span>
            {meta.enableColumnVisibility ? (
              <Menu
                align="end"
                label="Toggle columns"
                trigger={
                  <Button variant="ghost" size="sm" iconOnly aria-label="Show columns">
                    <Columns3 />
                  </Button>
                }
              >
                <MenuLabel>Columns</MenuLabel>
                {leafColumns.map((column) => (
                  <MenuItem
                    key={column.id}
                    closeOnSelect={false}
                    onClick={() => column.toggleVisibility()}
                  >
                    <Checkbox
                      checked={column.getIsVisible()}
                      readOnly
                      tabIndex={-1}
                      label={String(column.columnDef.header ?? column.id)}
                    />
                  </MenuItem>
                ))}
              </Menu>
            ) : null}
            {meta.enableDensityToggle ? (
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                aria-label={`Density: ${density}`}
                title={`Density: ${density}`}
                onClick={densityCycle}
              >
                <Rows3 />
              </Button>
            ) : null}
            {meta.enableFullScreenToggle ? (
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                aria-label={meta.isFullScreen ? 'Exit full screen' : 'Full screen'}
                onClick={() => meta.setIsFullScreen(!meta.isFullScreen)}
              >
                {meta.isFullScreen ? <Minimize2 /> : <Maximize2 />}
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}

      <div
        ref={scrollRef}
        className={cx(
          'kf-datatable__scroll',
          meta.enableStickyHeader && 'kf-datatable__scroll--sticky',
          meta.enableRowVirtualization && 'kf-datatable__scroll--virtual',
        )}
      >
        {meta.isLoading ? (
          <div className="kf-datatable__loading">
            <Spinner label="Loading table" />
          </div>
        ) : null}
        <table className="kf-datatable__table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const metaInfo = colMeta(header.column)
                  const align =
                    metaInfo.align ??
                    (header.column.columnDef as DataTableColumnDef<TData>).align
                  const kind = metaInfo.kind
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cx(
                        alignClass(align),
                        header.column.getIsPinned() && 'kf-datatable__cell--pinned',
                      )}
                      style={{
                        width: header.getSize(),
                        ...pinStyle(header.column),
                      }}
                    >
                      {header.isPlaceholder ? null : kind === 'select' ? (
                        <Checkbox
                          aria-label="Select all rows"
                          checked={table.getIsAllPageRowsSelected()}
                          indeterminate={
                            table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
                          }
                          onChange={table.getToggleAllPageRowsSelectedHandler()}
                        />
                      ) : kind === 'expand' ? null : (
                        <div className="kf-datatable__th-inner">
                          {header.column.getCanSort() ? (
                            <button
                              type="button"
                              className="kf-datatable__sort"
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {header.column.getIsSorted() === 'asc' ? (
                                <ArrowUp size={12} />
                              ) : header.column.getIsSorted() === 'desc' ? (
                                <ArrowDown size={12} />
                              ) : (
                                <ArrowUpDown size={12} />
                              )}
                            </button>
                          ) : (
                            flexRender(header.column.columnDef.header, header.getContext())
                          )}
                          {(meta.enableColumnPinning || meta.enableColumnOrdering) &&
                          !String(header.column.id).startsWith('kf-') ? (
                            <ColumnActionsMenu
                              column={header.column}
                              enablePinning={meta.enableColumnPinning}
                              enableOrdering={meta.enableColumnOrdering}
                              table={table}
                            />
                          ) : null}
                        </div>
                      )}
                      {header.column.getCanFilter() && table.options.enableColumnFilters ? (
                        <ColumnFilter column={header.column} />
                      ) : null}
                      {header.column.getCanResize() ? (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={cx(
                            'kf-datatable__resizer',
                            header.column.getIsResizing() && 'is-resizing',
                          )}
                        />
                      ) : null}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={Math.max(table.getVisibleLeafColumns().length, 1)}>
                  <div className="kf-datatable__empty">
                    {typeof empty === 'string' ? <EmptyState title={empty} /> : empty}
                  </div>
                </td>
              </tr>
            ) : meta.enableRowVirtualization && virtualRows ? (
              <>
                {paddingTop > 0 ? (
                  <tr>
                    <td style={{ height: paddingTop }} colSpan={table.getVisibleLeafColumns().length} />
                  </tr>
                ) : null}
                {virtualRows.map((virtualRow) => {
                  const row = rows[virtualRow.index]
                  return (
                    <DataTableRow
                      key={row.id}
                      row={row}
                      table={table}
                      measureRef={virtualizer.measureElement}
                      virtualIndex={virtualRow.index}
                    />
                  )
                })}
                {paddingBottom > 0 ? (
                  <tr>
                    <td
                      style={{ height: paddingBottom }}
                      colSpan={table.getVisibleLeafColumns().length}
                    />
                  </tr>
                ) : null}
              </>
            ) : (
              rows.map((row) => <DataTableRow key={row.id} row={row} table={table} />)
            )}
          </tbody>
        </table>
      </div>

      {meta.enableBottomToolbar && meta.enablePagination ? (
        <div className="kf-datatable__pager">
          <div className="kf-datatable__pager-left">
            <Select
              aria-label="Rows per page"
              value={String(pageSize)}
              onValueChange={(value) => table.setPageSize(Number(value))}
              options={meta.pageSizeOptions.map((size) => ({
                value: String(size),
                label: `${size} / page`,
              }))}
              className="kf-datatable__page-size"
            />
            <span className="kf-datatable__meta">
              {filteredCount === 0
                ? '0 rows'
                : `${pageIndex * pageSize + 1}–${Math.min((pageIndex + 1) * pageSize, filteredCount)} of ${filteredCount}`}
            </span>
          </div>
          <div className="kf-datatable__pager-right">
            <Button
              size="sm"
              variant="secondary"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              Previous
            </Button>
            <span className="kf-datatable__meta">
              Page {pageCount === 0 ? 0 : pageIndex + 1} of {Math.max(pageCount, 1)}
            </span>
            <Button
              size="sm"
              variant="secondary"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function DataTableRow<TData extends object>({
  row,
  table,
  measureRef,
  virtualIndex,
}: {
  row: Row<TData>
  table: TanStackTable<TData>
  measureRef?: (node: HTMLElement | null) => void
  virtualIndex?: number
}) {
  const meta = getMeta(table)!
  const detail = meta.renderDetailPanel
  const colSpan = row.getVisibleCells().length

  return (
    <>
      <tr
        ref={measureRef}
        data-index={virtualIndex}
        data-selected={row.getIsSelected() || undefined}
        className={cx(row.getIsSelected() && 'is-selected', meta.onRowClick && 'is-clickable')}
        onClick={() => meta.onRowClick?.(row)}
      >
        {row.getVisibleCells().map((cell) => {
          const metaInfo = colMeta(cell.column)
          const align =
            metaInfo.align ?? (cell.column.columnDef as DataTableColumnDef<TData>).align
          const kind = metaInfo.kind
          return (
            <td
              key={cell.id}
              className={cx(
                alignClass(align),
                cell.column.getIsPinned() && 'kf-datatable__cell--pinned',
              )}
              style={{ width: cell.column.getSize(), ...pinStyle(cell.column) }}
              onClick={
                kind === 'select' || kind === 'expand'
                  ? (event) => event.stopPropagation()
                  : undefined
              }
            >
              {kind === 'select' ? (
                <Checkbox
                  aria-label="Select row"
                  checked={row.getIsSelected()}
                  disabled={!row.getCanSelect()}
                  onChange={row.getToggleSelectedHandler()}
                />
              ) : kind === 'expand' ? (
                row.getCanExpand() ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconOnly
                    aria-label={row.getIsExpanded() ? 'Collapse row' : 'Expand row'}
                    onClick={row.getToggleExpandedHandler()}
                  >
                    {row.getIsExpanded() ? <ChevronDown /> : <ChevronRight />}
                  </Button>
                ) : null
              ) : (
                flexRender(cell.column.columnDef.cell, cell.getContext())
              )}
            </td>
          )
        })}
      </tr>
      {detail && row.getIsExpanded() ? (
        <tr className="kf-datatable__detail-row">
          <td colSpan={colSpan}>
            <div className="kf-datatable__detail">{detail({ row })}</div>
          </td>
        </tr>
      ) : null}
    </>
  )
}

function ColumnFilter({ column }: { column: Column<any, unknown> }) {
  const def = column.columnDef as DataTableColumnDef<any>
  const value = (column.getFilterValue() as string) ?? ''
  if (def.filterVariant === 'select' && def.filterSelectOptions) {
    return (
      <Select
        aria-label={`Filter ${column.id}`}
        value={value}
        onValueChange={(next) => column.setFilterValue(next || undefined)}
        options={[{ value: '', label: 'All' }, ...def.filterSelectOptions]}
        className="kf-datatable__column-filter"
      />
    )
  }
  return (
    <input
      className="kf-datatable__column-filter-input"
      value={value}
      placeholder="Filter…"
      onChange={(event) => column.setFilterValue(event.target.value || undefined)}
    />
  )
}

function ColumnActionsMenu<TData extends object>({
  column,
  enablePinning,
  enableOrdering,
  table,
}: {
  column: Column<TData, unknown>
  enablePinning: boolean
  enableOrdering: boolean
  table: TanStackTable<TData>
}) {
  return (
    <Menu
      align="end"
      label="Column actions"
      trigger={
        <Button variant="ghost" size="sm" iconOnly aria-label="Column actions">
          <ChevronDown size={12} />
        </Button>
      }
    >
      {enableOrdering ? (
        <>
          <MenuItem
            onClick={() => {
              const order = table.getState().columnOrder
              const ids =
                order.length > 0 ? order : table.getAllLeafColumns().map((c) => c.id)
              const idx = ids.indexOf(column.id)
              if (idx > 0) {
                const next = [...ids]
                ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
                table.setColumnOrder(next)
              }
            }}
          >
            Move left
          </MenuItem>
          <MenuItem
            onClick={() => {
              const order = table.getState().columnOrder
              const ids =
                order.length > 0 ? order : table.getAllLeafColumns().map((c) => c.id)
              const idx = ids.indexOf(column.id)
              if (idx >= 0 && idx < ids.length - 1) {
                const next = [...ids]
                ;[next[idx + 1], next[idx]] = [next[idx], next[idx + 1]]
                table.setColumnOrder(next)
              }
            }}
          >
            Move right
          </MenuItem>
          <MenuSeparator />
        </>
      ) : null}
      {enablePinning ? (
        <>
          <MenuItem onClick={() => column.pin('left')}>
            <Pin size={14} /> Pin left
          </MenuItem>
          <MenuItem onClick={() => column.pin('right')}>
            <Pin size={14} /> Pin right
          </MenuItem>
          <MenuItem onClick={() => column.pin(false)}>Unpin</MenuItem>
          <MenuSeparator />
        </>
      ) : null}
      {column.getCanHide() ? (
        <MenuItem onClick={() => column.toggleVisibility(false)}>Hide column</MenuItem>
      ) : null}
    </Menu>
  )
}
