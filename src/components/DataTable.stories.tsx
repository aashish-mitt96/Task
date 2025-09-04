import type { Meta, StoryObj } from '@storybook/react'
import DataTable, { type DataTableProps } from './DataTable'

type User = { id: number; name: string; email: string; age: number }

const data: User[] = [
  { id: 1, name: 'Ashish Mittal', email: 'ashish@gmail.com', age: 20 },
  { id: 2, name: 'Ayush Singh', email: 'ayush@gmail.com', age: 21 },
  { id: 3, name: 'Pratik Panda', email: 'pratik@gmail.com', age: 22 },
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
