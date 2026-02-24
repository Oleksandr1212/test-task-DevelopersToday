import type { Meta, StoryObj } from '@storybook/react';
import { SidebarMenu } from './SidebarMenu';
import type { MenuItem } from './SidebarMenu';
import { useState } from 'react';

const meta: Meta<typeof SidebarMenu> = {
    title: 'Components/SidebarMenu',
    component: SidebarMenu,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SidebarMenu>;

const sampleItems: MenuItem[] = [
    { id: '1', label: 'Dashboard', icon: '📊' },
    {
        id: '2',
        label: 'Projects',
        icon: '📂',
        children: [
            { id: '2-1', label: 'Web Development' },
            { id: '2-2', label: 'Mobile Apps' },
            {
                id: '2-3',
                label: 'Design',
                children: [
                    { id: '2-3-1', label: 'UI/UX' },
                    { id: '2-3-2', label: 'Branding' }
                ]
            }
        ]
    },
    { id: '3', label: 'Team', icon: '👥' },
    {
        id: '4',
        label: 'Settings',
        icon: '⚙️',
        children: [
            { id: '4-1', label: 'Profile' },
            { id: '4-2', label: 'Security' }
        ]
    },
    { id: '5', label: 'Help', icon: '❓' },
];

export const Default: Story = {
    args: {
        isOpen: true,
        items: sampleItems,
        title: 'Navigation',
        onClose: () => console.log('Close clicked'),
    },
};

export const Interactive: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ height: '100vh', width: '100%', padding: '20px' }}>
            <button
                onClick={() => setIsOpen(true)}
                style={{
                    padding: '12px 24px',
                    backgroundColor: '#111827',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 600
                }}
            >
                Open Sidebar Menu
            </button>

            <SidebarMenu
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                items={sampleItems}
                title="Admin Panel"
            />

            <div style={{ marginTop: '20px', color: '#6b7280' }}>
                Click the button to see the slide-in menu from the right.
            </div>
        </div>
    );
};
