import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import InputField, { type InputFieldProps } from './InputField'

const meta: Meta<InputFieldProps> = {
  title: 'Components/InputField',
  component: (args) => {
    const [value, setValue] = useState(args.value ?? '')
    return <InputField {...args} value={value} onChange={(e) => setValue(e.target.value)} />
  },
  args: { label: 'Label', placeholder: 'Type here...', variant: 'outlined', size: 'md' },
  parameters: { controls: { expanded: true } }
}
export default meta
type Story = StoryObj<InputFieldProps>

export const Basic: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="space-y-4">
      <InputField {...args} label="Outlined" variant="outlined" />
      <InputField {...args} label="Filled" variant="filled" />
      <InputField {...args} label="Ghost" variant="ghost" />
    </div>
  )
}

export const Sizes: Story = {
  render: (args) => (
    <div className="space-y-4">
      <InputField {...args} label="Small" size="sm" />
      <InputField {...args} label="Medium" size="md" />
      <InputField {...args} label="Large" size="lg" />
    </div>
  )
}

export const States: Story = {
  args: { helperText: 'Helper text' },
  render: (args) => (
    <div className="space-y-4">
      <InputField {...args} label="Disabled" disabled />
      <InputField {...args} label="Invalid" invalid errorMessage="This field is required." />
      <InputField {...args} label="Loading" loading />
    </div>
  )
}

export const ClearAndPassword: Story = {
  render: () => {
    const [text, setText] = useState('Hello')
    const [pwd, setPwd] = useState('secret')
    return (
      <div className="space-y-4">
        <InputField label="Clearable" value={text} onChange={(e) => setText(e.target.value)} clearable />
        <InputField label="Password" value={pwd} onChange={(e) => setPwd(e.target.value)} passwordToggle />
      </div>
    )
  }
}
