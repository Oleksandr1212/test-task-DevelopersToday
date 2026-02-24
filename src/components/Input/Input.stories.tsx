import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

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

export const WithReactHookForm: Story = {
  name: 'Bonus: React Hook Form',
  render: () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: {
        username: '',
        email: '',
      },
    });

    const onSubmit = (data: any) => {
      alert(JSON.stringify(data, null, 2));
    };

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
        <Input
          label="Username"
          placeholder="Enter username"
          {...register('username', { required: 'Username is required' })}
          error={errors.username?.message}
        />

        <Input
          label="Email"
          type="email"
          placeholder="Enter email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          error={errors.email?.message}
        />

        <button
          type="submit"
          style={{
            padding: '12px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Submit Form
        </button>
      </form>
    );
  },
};
