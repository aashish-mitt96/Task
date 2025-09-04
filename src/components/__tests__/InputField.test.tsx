import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import InputField from '../InputField'

describe('InputField', () => {
  it('renders label and placeholder', () => {
    render(<InputField label="Username" placeholder="Enter username" /> as any)
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument()
  })

  it('shows error message when invalid', () => {
    render(<InputField label="Email" invalid errorMessage="Invalid" /> as any)
    expect(screen.getByText('Invalid')).toBeInTheDocument()
  })

  it('clear button clears the value', () => {
    const Wrapper = () => {
      const [v, setV] = (React as any).useState('hello')
      return <InputField label="Search" value={v} onChange={(e) => setV((e as any).target.value)} clearable />
    }
    render(<Wrapper />)
    const input = screen.getByLabelText('Search') as HTMLInputElement
    expect(input.value).toBe('hello')
    const btn = screen.getByRole('button', { name: /clear input/i })
    fireEvent.click(btn)
    expect(input.value).toBe('')
  })
})
