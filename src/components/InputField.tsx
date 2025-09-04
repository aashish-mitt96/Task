import { useId, useState } from 'react'
import clsx  from 'clsx'

type Variant = 'filled' | 'outlined' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

export interface InputFieldProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string
  helperText?: string
  errorMessage?: string
  disabled?: boolean
  invalid?: boolean
  variant?: Variant
  size?: Size
  clearable?: boolean
  passwordToggle?: boolean
  loading?: boolean
  type?: React.HTMLInputTypeAttribute
  name?: string
}

export default function InputField({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = 'outlined',
  size = 'md',
  clearable,
  passwordToggle,
  loading,
  type = 'text',
  name
}: InputFieldProps) {
  const inputId = useId()
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === 'password' || passwordToggle
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  const base =
    'w-full rounded-xl transition focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-500'

  const sizeCls = {
    sm: 'text-sm px-3 py-2',
    md: 'text-base px-3.5 py-2.5',
    lg: 'text-lg px-4 py-3'
  }[size]

 const variantCls = {
  filled:
    'bg-gray-100 border border-transparent focus:ring-2 focus:ring-blue-500 ' +
    'dark:bg-gray-200 dark:text-black dark:placeholder-gray-600',
  outlined:
    'bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 ' +
    'dark:bg-white dark:border-gray-400 dark:text-black dark:placeholder-gray-600',
  ghost:
    'bg-transparent border border-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ' +
    'dark:text-white dark:placeholder-gray-400',
}[variant]


  const rightPadding = (clearable || isPassword || loading) ? 'pr-10' : ''

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-gray-700 dark:text-zinc-300">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={invalid ? true : undefined}
          aria-busy={loading ? true : undefined}
          disabled={disabled || loading}
          type={inputType}
          className={clsx(base, sizeCls, variantCls, rightPadding)}
        />

        {loading && (
          <div className="absolute inset-y-0 right-2 flex items-center">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
              <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" fill="none" />
            </svg>
          </div>
        )}

        {clearable && !!value && !loading && !disabled && (
          <button
            type="button"
            aria-label="Clear input"
            className="absolute inset-y-0 right-2 flex items-center"
            onClick={() => {
              onChange?.({ target: { value: '' } } as unknown as React.ChangeEvent<HTMLInputElement>)
            }}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        )}

        {isPassword && !loading && (
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className={clsx('absolute inset-y-0', clearable ? 'right-8' : 'right-2', 'flex items-center')}
            onClick={() => setShowPassword((s) => !s)}
            disabled={disabled}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              {showPassword ? (
                <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7zm10-4a4 4 0 100 8 4 4 0 000-8z" fill="currentColor"/>
              ) : (
                <>
                  <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" fill="currentColor" opacity="0.7"/>
                  <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="2" />
                </>
              )}
            </svg>
          </button>
        )}
      </div>

      <div className="mt-1 min-h-[1.25rem] text-xs">
        {invalid && errorMessage ? (
          <p className="text-red-600">{errorMessage}</p>
        ) : helperText ? (
          <p className="text-gray-500 dark:text-zinc-400">{helperText}</p>
        ) : null}
      </div>
    </div>
  )
}
