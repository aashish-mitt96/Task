import type { Meta, StoryObj } from '@storybook/react'
import DataTable, { type DataTableProps } from './DataTable'

type User = { id: number; name: string; email: string; age: number }

const data: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', age: 28 },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', age: 35 },
  { id: 3, name: 'Charlie Green', email: 'charlie@example.com', age: 22 },
]

const columns = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
] as const

const meta: Meta<DataTableProps<User>> = {
  title: 'Components/DataTable',
  component: DataTable,
  args: { data, columns: columns as any, selectable: true },
  parameters: { controls: { expanded: true } }
}
export default meta
type Story = StoryObj<DataTableProps<User>>

export const Basic: Story = {}

export const Loading: Story = { args: { loading: true } }

export const Empty: Story = { args: { data: [] } }
