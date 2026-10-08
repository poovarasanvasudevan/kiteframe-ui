import { createColumnHelper, type ColumnHelper } from '@tanstack/react-table'
import type { DataTableColumnDef } from './types'

/** Typed column helper (TanStack `createColumnHelper` + KiteFrame column extras). */
export function createDataTableColumnHelper<TData extends object>() {
  const helper = createColumnHelper<TData>()
  return {
    accessor: helper.accessor.bind(helper) as ColumnHelper<TData>['accessor'],
    display: helper.display.bind(helper) as ColumnHelper<TData>['display'],
    group: helper.group.bind(helper) as ColumnHelper<TData>['group'],
    columns: (defs: DataTableColumnDef<TData, any>[]) => defs,
  }
}
