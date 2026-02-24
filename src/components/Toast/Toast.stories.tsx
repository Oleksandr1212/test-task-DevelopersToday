import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';
import { useState } from 'react';

const meta: Meta<typeof Toast> = {
    title: 'Components/Toast',
    component: Toast,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['info', 'success', 'warning', 'error'],
        },
        onClose: { action: 'closed' },
    },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Info: Story = {
    args: {
        message: 'This is an information toast message.',
        type: 'info',
        duration: 3000,
    },
};

export const Success: Story = {
    args: {
        message: 'Operation completed successfully!',
        type: 'success',
        duration: 3000,
    },
};

export const Warning: Story = {
    args: {
        message: 'Be careful with this action.',
        type: 'warning',
        duration: 3000,
    },
};

export const Error: Story = {
    args: {
        message: 'An error occurred. Please try again.',
        type: 'error',
        duration: 3000,
    },
};

// Interactive story to demonstrate showing/hiding
export const Interactive: React.FC = () => {
    const [show, setShow] = useState(false);

    return (
        <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button
                onClick={() => setShow(true)}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                }}
            >
                Show Toast
            </button>
            <Toast
                isVisible={show}
                message="Hello! I am a toast message."
                type="success"
                onClose={() => setShow(false)}
            />
        </div>
    );
};
