import { useMemo, useState } from 'react'
import clsx from 'clsx'

export interface Column<T> {
  key: string
  title: string
  dataIndex: keyof T
  sortable?: boolean
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  selectable?: boolean
  onRowSelect?: (selectedRows: T[]) => void
}

type SortState<T> = {
  key: keyof T | null
  direction: 'asc' | 'desc' | null
}

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect
}: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState<T>>({ key: null, direction: null })
  const [selected, setSelected] = useState<number[]>([])

  const sortedData = useMemo(() => {
    if (!sort.key || !sort.direction) return data
    const copy = [...data]
    copy.sort((a, b) => {
      const va = a[sort.key as keyof T]
      const vb = b[sort.key as keyof T]
      if (va == null && vb == null) return 0
      if (va == null) return 1
      if (vb == null) return -1
      if (typeof va === 'number' && typeof vb === 'number') {
        return sort.direction === 'asc' ? va - vb : vb - va
      }
      return sort.direction === 'asc'
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va))
    })
    return copy
  }, [data, sort])

  const toggleSort = (col: Column<T>) => {
    if (!col.sortable) return
    setSort((s) => {
      if (s.key !== col.dataIndex) return { key: col.dataIndex, direction: 'asc' }
      if (s.direction === 'asc') return { key: col.dataIndex, direction: 'desc' }
      return { key: null, direction: null }
    })
  }

  const allSelected = selectable && data.length > 0 && selected.length === data.length
  const someSelected = selectable && selected.length > 0 && selected.length < data.length

  const toggleAll = () => {
    if (!selectable) return
    if (selected.length === data.length) {
      setSelected([])
      onRowSelect?.([])
    } else {
      const all = data.map((_, i) => i)
      setSelected(all)
      onRowSelect?.(data)
    }
  }

  const toggleRow = (idx: number) => {
    if (!selectable) return
    setSelected((prev) => {
      const exists = prev.includes(idx)
      const next = exists ? prev.filter((i) => i !== idx) : [...prev, idx]
      onRowSelect?.(next.map((i) => sortedData[i]))
      return next
    })
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
      <table
        className="min-w-full divide-y divide-gray-200"
        role="table"
        aria-busy={loading}
      >
        <thead className="bg-gray-50">
          <tr>
            {selectable && (
              <th scope="col" className="px-3 py-2 w-10">
                <input
                  aria-label="Select all rows"
                  type="checkbox"
                  checked={!!allSelected}
                  ref={(el) => { if (el) el!.indeterminate = !!someSelected }}
                  onChange={toggleAll}
                />
              </th>
            )}
            {columns.map((col) => {
              const isSorted = sort.key === col.dataIndex
              const dir = isSorted ? sort.direction : null
              return (
                <th
                  key={col.key}
                  scope="col"
                  className={clsx(
                    'px-4 py-3 text-left text-sm font-semibold text-gray-700 select-none',
                    col.sortable && 'cursor-pointer hover:text-gray-900'
                  )}
                  onClick={() => toggleSort(col)}
                  aria-sort={isSorted ? (dir === 'asc' ? 'ascending' : 'descending') : 'none'}
                >
                  <div className="inline-flex items-center gap-1">
                    {col.title}
                    {col.sortable && (
                      <span aria-hidden="true" className="text-xs">
                        {isSorted ? (dir === 'asc' ? '▲' : '▼') : '↕'}
                      </span>
                    )}
                  </div>
                </th>
              )
            })}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 bg-white">
          {loading ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="px-4 py-10 text-center text-sm text-gray-500"
              >
                Loading...
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="px-4 py-10 text-center text-sm text-gray-500"
              >
                No data found.
              </td>
            </tr>
          ) : (
            sortedData.map((row, idx) => {
              const originalIndex = data.indexOf(row)
              const checked = selectable ? selected.includes(idx) : false
              return (
                <tr key={originalIndex} className="hover:bg-gray-50">
                  {selectable && (
                    <td className="px-3 py-2">
                      <input
                        aria-label={`Select row ${idx + 1}`}
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleRow(idx)}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3 text-sm text-gray-800">
                      {String(row[col.dataIndex])}
                    </td>
                  ))}
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>

  )
}
