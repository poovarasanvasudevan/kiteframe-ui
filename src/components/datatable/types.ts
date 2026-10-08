import type {
  ColumnDef,
  ColumnFiltersState,
  ColumnOrderState,
  ColumnPinningState,
  ColumnSizingState,
  ExpandedState,
  OnChangeFn,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
  Table,
  VisibilityState,
} from '@tanstack/react-table'
import type { ReactNode } from 'react'

export type DataTableDensity = 'compact' | 'comfortable' | 'spacious'

export type DataTableColumnDef<TData extends object, TValue = unknown> = ColumnDef<TData, TValue> & {
  /** Prefer left | center | right cell alignment. */
  align?: 'left' | 'center' | 'right'
  filterVariant?: 'text' | 'select'
  filterSelectOptions?: Array<{ label: string; value: string }>
}

type RowSelectable<TData extends object> = boolean | ((row: Row<TData>) => boolean)

export type UseDataTableOptions<TData extends object> = {
  columns: DataTableColumnDef<TData, any>[]
  data: TData[]
  getRowId?: (originalRow: TData, index: number, parent?: Row<TData>) => string

  enableSorting?: boolean
  enableMultiSort?: boolean
  enableGlobalFilter?: boolean
  enableColumnFilters?: boolean
  enablePagination?: boolean
  enableRowSelection?: RowSelectable<TData>
  enableMultiRowSelection?: boolean
  enableColumnVisibility?: boolean
  enableColumnOrdering?: boolean
  enableColumnResizing?: boolean
  enableColumnPinning?: boolean
  enableExpanding?: boolean
  enableDensityToggle?: boolean
  enableStickyHeader?: boolean
  enableRowNumbers?: boolean
  enableFullScreenToggle?: boolean
  enableBottomToolbar?: boolean
  enableTopToolbar?: boolean
  enableRowVirtualization?: boolean

  /** Render an expandable detail panel under a row. Enables expanding when set. */
  renderDetailPanel?: (props: { row: Row<TData> }) => ReactNode

  manualPagination?: boolean
  manualSorting?: boolean
  manualFiltering?: boolean
  rowCount?: number
  pageCount?: number

  initialState?: {
    sorting?: SortingState
    columnFilters?: ColumnFiltersState
    globalFilter?: string
    pagination?: Partial<PaginationState>
    rowSelection?: RowSelectionState
    columnVisibility?: VisibilityState
    columnOrder?: ColumnOrderState
    columnPinning?: ColumnPinningState
    columnSizing?: ColumnSizingState
    expanded?: ExpandedState
    density?: DataTableDensity
  }

  state?: {
    sorting?: SortingState
    columnFilters?: ColumnFiltersState
    globalFilter?: string
    pagination?: PaginationState
    rowSelection?: RowSelectionState
    columnVisibility?: VisibilityState
    columnOrder?: ColumnOrderState
    columnPinning?: ColumnPinningState
    columnSizing?: ColumnSizingState
    expanded?: ExpandedState
    density?: DataTableDensity
    isLoading?: boolean
    isFullScreen?: boolean
  }

  onSortingChange?: OnChangeFn<SortingState>
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>
  onGlobalFilterChange?: OnChangeFn<string>
  onPaginationChange?: OnChangeFn<PaginationState>
  onRowSelectionChange?: OnChangeFn<RowSelectionState>
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>
  onColumnOrderChange?: OnChangeFn<ColumnOrderState>
  onColumnPinningChange?: OnChangeFn<ColumnPinningState>
  onColumnSizingChange?: OnChangeFn<ColumnSizingState>
  onExpandedChange?: OnChangeFn<ExpandedState>
  onDensityChange?: OnChangeFn<DataTableDensity>
  onIsFullScreenChange?: OnChangeFn<boolean>

  isLoading?: boolean
  pageSizeOptions?: number[]
  defaultPageSize?: number
  onRowClick?: (row: Row<TData>) => void
}

export type DataTableMeta<TData extends object> = {
  density: DataTableDensity
  setDensity: (density: DataTableDensity) => void
  isLoading: boolean
  isFullScreen: boolean
  setIsFullScreen: (value: boolean) => void
  enableStickyHeader: boolean
  enableRowNumbers: boolean
  enableColumnVisibility: boolean
  enableColumnOrdering: boolean
  enableColumnPinning: boolean
  enableDensityToggle: boolean
  enableFullScreenToggle: boolean
  enableTopToolbar: boolean
  enableBottomToolbar: boolean
  enableGlobalFilter: boolean
  enableRowVirtualization: boolean
  enablePagination: boolean
  pageSizeOptions: number[]
  renderDetailPanel?: (props: { row: Row<TData> }) => ReactNode
  onRowClick?: (row: Row<TData>) => void
}

export type DataTableInstance<TData extends object> = Table<TData>
