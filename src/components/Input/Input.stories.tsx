import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'number', 'email'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

const InputWithState = (args: any) => {
  const [value, setValue] = useState(args.value || '');
  return (
    <Input
      {...args}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        args.onChange?.(e);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <InputWithState {...args} />,
  args: {
    label: 'Username',
    placeholder: 'Enter username...',
  },
};

export const Password: Story = {
  render: (args) => <InputWithState {...args} />,
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password...',
  },
};

export const Clearable: Story = {
  render: (args) => <InputWithState {...args} />,
  args: {
    label: 'Search',
    clearable: true,
    placeholder: 'Type something to see clear button...',
  },
};

export const Number: Story = {
  render: (args) => <InputWithState {...args} />,
  args: {
    label: 'Age',
    type: 'number',
    placeholder: '0',
  },
};

export const Error: Story = {
  render: (args) => <InputWithState {...args} />,
  args: {
    label: 'Email',
    type: 'email',
    error: 'Please enter a valid email address.',
    value: 'invalid-email',
  },
};
