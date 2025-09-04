# React Component Development Assignment

This project implements two reusable frontend components (`InputField` and `DataTable`) using **React, TypeScript, TailwindCSS, and Storybook**.  
The components are fully typed, styled, and documented with Storybook for easy exploration.

---

## Live Links

- 🔗 **GitHub Repository**: [Repo Link](https://github.com/aashish-mitt96/Task)
- 🔗 **Demo (Vercel)**: [Demo Link](https://task-five-pi.vercel.app/)
- 🔗 **Storybook Preview**: [Storybook Link](https://task-udfh.vercel.app/)

---


## Components

### 1. InputField
A flexible, accessible input component with validation and multiple UI states.

**Features**
- Label, placeholder, helper text, error message
- States: `disabled`, `invalid`, `loading`
- Variants: `filled`, `outlined`, `ghost`
- Sizes: `sm`, `md`, `lg`
- Optional: clear button, password toggle
- Works in both light & dark themes (neutral colors for readability)

**Props**
```ts
interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  clearable?: boolean;
  passwordToggle?: boolean;
  loading?: boolean;
}
```
### 2. DataTable

A responsive, interactive data table with sorting and selection.

**Features**
- Displays tabular data with customizable columns
- Column sorting (`asc` → `desc` → `none`)
- Row selection (single/multiple + select all)
- Loading & empty states
- Light theme by default (neutral readability)

**Props**
```ts
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}
```
## Approach

- **Scalable Structure** → Components are organized inside `src/components/` with colocated stories & tests.  
- **TypeScript First** → Strong typing with generics (`DataTableProps<T>`).  
- **UI Consistency** → TailwindCSS for styling, responsive design.  
- **Accessibility** → Added `aria-*` attributes for invalid state, sorting, and selection.  
- **Storybook Docs** → Interactive documentation for variants, states, and usage.  
- **Deployment** →  
  - Demo app deployed on **Vercel**  
  - Storybook deployed separately on **Vercel** (via `npm run build-storybook`)  

