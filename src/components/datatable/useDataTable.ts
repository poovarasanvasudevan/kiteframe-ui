import { useMemo } from 'react'
import {
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnOrderState,
  type ColumnPinningState,
  type ColumnSizingState,
  type ExpandedState,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table'
import { useControllableState } from '../../hooks/useControllableState'
import type {
  DataTableColumnDef,
  DataTableDensity,
  DataTableInstance,
  DataTableMeta,
  UseDataTableOptions,
} from './types'

function withDisplayColumns<TData extends object>(
  columns: DataTableColumnDef<TData, any>[],
  opts: {
    enableRowSelection?: UseDataTableOptions<TData>['enableRowSelection']
    enableExpanding?: boolean
    enableRowNumbers?: boolean
  },
): ColumnDef<TData, any>[] {
  const cols: ColumnDef<TData, any>[] = []

  if (opts.enableRowSelection) {
    cols.push({
      id: 'kf-select',
      size: 40,
      minSize: 40,
      maxSize: 48,
      enableSorting: false,
      enableHiding: false,
      enableResizing: false,
      header: () => null,
      cell: () => null,
      meta: { kind: 'select' },
    })
  }

  if (opts.enableExpanding) {
    cols.push({
      id: 'kf-expand',
      size: 36,
      minSize: 36,
      maxSize: 44,
      enableSorting: false,
      enableHiding: false,
      enableResizing: false,
      header: () => null,
      cell: () => null,
      meta: { kind: 'expand' },
    })
  }

  if (opts.enableRowNumbers) {
    cols.push({
      id: 'kf-row-number',
      header: '#',
      size: 48,
      minSize: 40,
      enableSorting: false,
      enableHiding: false,
      enableResizing: false,
      cell: ({ row, table }) => {
        const { pageIndex, pageSize } = table.getState().pagination
        return String(pageIndex * pageSize + row.index + 1)
      },
      meta: { kind: 'row-number', align: 'right' },
    })
  }

  return [...cols, ...columns]
}

/**
 * Headless table state hook (Material React Table–style API) built on TanStack Table.
 *
 * @example
 * const table = useDataTable({ columns, data, enableRowSelection: true })
 * return <DataTable table={table} />
 */
export function useDataTable<TData extends object>(
  options: UseDataTableOptions<TData>,
): DataTableInstance<TData> {
  const {
    columns,
    data,
    getRowId,
    enableSorting = true,
    enableMultiSort = false,
    enableGlobalFilter = true,
    enableColumnFilters = false,
    enablePagination = true,
    enableRowSelection = false,
    enableMultiRowSelection = true,
    enableColumnVisibility = true,
    enableColumnOrdering = false,
    enableColumnResizing = false,
    enableColumnPinning = false,
    enableExpanding = false,
    enableDensityToggle = true,
    enableStickyHeader = true,
    enableRowNumbers = false,
    enableFullScreenToggle = true,
    enableBottomToolbar = true,
    enableTopToolbar = true,
    enableRowVirtualization = false,
    renderDetailPanel,
    manualPagination,
    manualSorting,
    manualFiltering,
    rowCount,
    pageCount,
    initialState,
    state: controlledState,
    onSortingChange,
    onColumnFiltersChange,
    onGlobalFilterChange,
    onPaginationChange,
    onRowSelectionChange,
    onColumnVisibilityChange,
    onColumnOrderChange,
    onColumnPinningChange,
    onColumnSizingChange,
    onExpandedChange,
    onDensityChange,
    onIsFullScreenChange,
    isLoading = false,
    pageSizeOptions = [10, 25, 50, 100],
    defaultPageSize = 10,
    onRowClick,
  } = options

  const hasDetailPanel = Boolean(renderDetailPanel)
  const expandingEnabled = enableExpanding || hasDetailPanel

  const [sorting, setSorting] = useControllableState<SortingState>({
    value: controlledState?.sorting,
    defaultValue: initialState?.sorting ?? [],
    onChange: onSortingChange as ((v: SortingState) => void) | undefined,
  })
  const [columnFilters, setColumnFilters] = useControllableState<ColumnFiltersState>({
    value: controlledState?.columnFilters,
    defaultValue: initialState?.columnFilters ?? [],
    onChange: onColumnFiltersChange as ((v: ColumnFiltersState) => void) | undefined,
  })
  const [globalFilter, setGlobalFilter] = useControllableState<string>({
    value: controlledState?.globalFilter,
    defaultValue: initialState?.globalFilter ?? '',
    onChange: onGlobalFilterChange as ((v: string) => void) | undefined,
  })
  const [pagination, setPagination] = useControllableState<PaginationState>({
    value: controlledState?.pagination,
    defaultValue: {
      pageIndex: initialState?.pagination?.pageIndex ?? 0,
      pageSize: initialState?.pagination?.pageSize ?? defaultPageSize,
    },
    onChange: onPaginationChange as ((v: PaginationState) => void) | undefined,
  })
  const [rowSelection, setRowSelection] = useControllableState<RowSelectionState>({
    value: controlledState?.rowSelection,
    defaultValue: initialState?.rowSelection ?? {},
    onChange: onRowSelectionChange as ((v: RowSelectionState) => void) | undefined,
  })
  const [columnVisibility, setColumnVisibility] = useControllableState<VisibilityState>({
    value: controlledState?.columnVisibility,
    defaultValue: initialState?.columnVisibility ?? {},
    onChange: onColumnVisibilityChange as ((v: VisibilityState) => void) | undefined,
  })
  const [columnOrder, setColumnOrder] = useControllableState<ColumnOrderState>({
    value: controlledState?.columnOrder,
    defaultValue: initialState?.columnOrder ?? [],
    onChange: onColumnOrderChange as ((v: ColumnOrderState) => void) | undefined,
  })
  const [columnPinning, setColumnPinning] = useControllableState<ColumnPinningState>({
    value: controlledState?.columnPinning,
    defaultValue: initialState?.columnPinning ?? {},
    onChange: onColumnPinningChange as ((v: ColumnPinningState) => void) | undefined,
  })
  const [columnSizing, setColumnSizing] = useControllableState<ColumnSizingState>({
    value: controlledState?.columnSizing,
    defaultValue: initialState?.columnSizing ?? {},
    onChange: onColumnSizingChange as ((v: ColumnSizingState) => void) | undefined,
  })
  const [expanded, setExpanded] = useControllableState<ExpandedState>({
    value: controlledState?.expanded,
    defaultValue: initialState?.expanded ?? {},
    onChange: onExpandedChange as ((v: ExpandedState) => void) | undefined,
  })
  const [density, setDensity] = useControllableState<DataTableDensity>({
    value: controlledState?.density,
    defaultValue: initialState?.density ?? 'comfortable',
    onChange: onDensityChange as ((v: DataTableDensity) => void) | undefined,
  })
  const [isFullScreen, setIsFullScreen] = useControllableState<boolean>({
    value: controlledState?.isFullScreen,
    defaultValue: false,
    onChange: onIsFullScreenChange as ((v: boolean) => void) | undefined,
  })

  const resolvedColumns = useMemo(
    () =>
      withDisplayColumns(columns, {
        enableRowSelection,
        enableExpanding: expandingEnabled,
        enableRowNumbers,
      }),
    [columns, enableRowSelection, expandingEnabled, enableRowNumbers],
  )

  const meta: DataTableMeta<TData> = {
    density,
    setDensity,
    isLoading: controlledState?.isLoading ?? isLoading,
    isFullScreen,
    setIsFullScreen,
    enableStickyHeader,
    enableRowNumbers,
    enableColumnVisibility,
    enableColumnOrdering,
    enableColumnPinning,
    enableDensityToggle,
    enableFullScreenToggle,
    enableTopToolbar,
    enableBottomToolbar,
    enableGlobalFilter,
    enableRowVirtualization,
    enablePagination,
    pageSizeOptions,
    renderDetailPanel,
    onRowClick,
  }

  const table = useReactTable({
    data,
    columns: resolvedColumns,
    getRowId,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
      rowSelection,
      columnVisibility,
      columnOrder,
      columnPinning,
      columnSizing,
      expanded,
    },
    onSortingChange: setSorting as never,
    onColumnFiltersChange: setColumnFilters as never,
    onGlobalFilterChange: setGlobalFilter as never,
    onPaginationChange: setPagination as never,
    onRowSelectionChange: setRowSelection as never,
    onColumnVisibilityChange: setColumnVisibility as never,
    onColumnOrderChange: setColumnOrder as never,
    onColumnPinningChange: setColumnPinning as never,
    onColumnSizingChange: setColumnSizing as never,
    onExpandedChange: setExpanded as never,
    enableSorting,
    enableMultiSort,
    enableFilters: enableColumnFilters || enableGlobalFilter,
    enableGlobalFilter,
    enableColumnFilters,
    enableRowSelection: enableRowSelection || false,
    enableMultiRowSelection,
    enableColumnResizing,
    columnResizeMode: 'onChange',
    enableExpanding: expandingEnabled,
    getRowCanExpand: hasDetailPanel ? () => true : undefined,
    manualPagination,
    manualSorting,
    manualFiltering,
    rowCount,
    pageCount,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting && !manualSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel:
      (enableGlobalFilter || enableColumnFilters) && !manualFiltering
        ? getFilteredRowModel()
        : undefined,
    getPaginationRowModel: enablePagination && !manualPagination ? getPaginationRowModel() : undefined,
    getExpandedRowModel: expandingEnabled ? getExpandedRowModel() : undefined,
    meta,
  })

  return table as DataTableInstance<TData>
}
