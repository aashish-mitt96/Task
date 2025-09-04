import { useMemo, useState } from 'react'
import InputField from './components/InputField.tsx'
import DataTable from './components/DataTable.tsx'

type User = { id: number; name: string; email: string; age: number }

const initialData: User[] = [
  { id: 1, name: 'Ashish Mittal', email: 'ashish@gmail.com', age: 20 },
  { id: 2, name: 'Ayush Singh', email: 'ayush@gmail.com', age: 21 },
  { id: 3, name: 'Pratik Panda', email: 'pratik@gmail.com', age: 22 },
]

export default function App() {
  const [query, setQuery] = useState('')
  const [password, setPassword] = useState('')

  const data = useMemo(() => {
    if (!query) return initialData
    return initialData.filter((u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase())
    )
  }, [query])

  return (
    <div>
      <div className="min-h-screen bg-white text-gray-900 dark:bg-zinc-900 dark:text-zinc-100">
        <div className="max-w-5xl mx-auto p-6 space-y-8">
          <header className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">React Components Demo</h1>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">InputField</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <InputField
                label="Search users"
                placeholder="Type a name or email..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                helperText="Try 'Alice'"
                variant="outlined"
                size="md"
                clearable
              />
              <InputField
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                errorMessage={!password ? 'Required' : undefined}
                invalid={!password}
                variant="filled"
                size="md"
                passwordToggle
                type="password"
              />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">DataTable</h2>
            <DataTable<User>
              data={data}
              columns={[
                { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
                { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
                { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
              ]}
              selectable
              onRowSelect={(rows) => console.log('Selected rows', rows)}
            />
          </section>
        </div>
      </div>
    </div>
  )
}
