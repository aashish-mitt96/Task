import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import DataTable, { type Column } from '../DataTable'

type Row = { id: number; name: string; age: number }
const data: Row[] = [
  { id: 1, name: 'Ashish', age: 20 },
  { id: 2, name: 'Ayush', age: 21 },
  { id: 3, name: 'Pratik', age: 22 },
]

const columns: Column<Row>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
]


describe('DataTable', () => {
  it('renders rows', () => {
    render(<DataTable data={data} columns={columns} />)
    expect(screen.getByText('Pratik')).toBeInTheDocument()
    expect(screen.getByText('Ashish')).toBeInTheDocument()
    expect(screen.getByText('Ayush')).toBeInTheDocument()
  })

  it('sorts by column', () => {
    render(<DataTable data={data} columns={columns} />)
    const nameHeader = screen.getByText('Name')
    fireEvent.click(nameHeader) 
    const rows = screen.getAllByRole('row').slice(1)
    const firstRow = within(rows[0]).getByText('Ashish')
    expect(firstRow).toBeInTheDocument()
    fireEvent.click(nameHeader) 
    const rows2 = screen.getAllByRole('row').slice(1)
    const firstRow2 = within(rows2[0]).getByText('Pratk')
    expect(firstRow2).toBeInTheDocument()
  })

  it('selects rows', () => {
    const handle = vi.fn()
    render(<DataTable data={data} columns={columns} selectable onRowSelect={handle} />)
    const firstRowCheckbox = screen.getByLabelText('Select row 1')
    fireEvent.click(firstRowCheckbox)
    expect(firstRowCheckbox).toBeChecked()
    expect(handle).toHaveBeenCalled()
  })
})
