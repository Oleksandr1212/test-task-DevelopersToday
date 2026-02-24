import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SidebarMenu.css';

export interface MenuItem {
    id: string;
    label: string;
    icon?: string;
    children?: MenuItem[];
    onClick?: () => void;
}

export interface SidebarMenuProps {
    isOpen: boolean;
    onClose: () => void;
    items: MenuItem[];
    title?: string;
}

const MenuList: React.FC<{ items: MenuItem[]; level?: number }> = ({
    items,
    level = 0
}) => {
    return (
        <ul className={`dt-sidebar__list dt-sidebar__list--level-${level}`}>
            {items.map((item) => (
                <MenuItemRow key={item.id} item={item} level={level} />
            ))}
        </ul>
    );
};

const MenuItemRow: React.FC<{ item: MenuItem; level: number }> = ({ item, level }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasChildren = item.children && item.children.length > 0;

    const handleClick = (e: React.MouseEvent) => {
        if (hasChildren) {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
        } else if (item.onClick) {
            item.onClick();
        }
    };

    return (
        <li className="dt-sidebar__item-container">
            <div
                className={`dt-sidebar__item ${isExpanded ? 'is-expanded' : ''}`}
                onClick={handleClick}
                style={{ paddingLeft: `${(level + 1) * 16}px` }}
            >
                <div className="dt-sidebar__item-content">
                    {item.icon && <span className="dt-sidebar__item-icon">{item.icon}</span>}
                    <span className="dt-sidebar__item-label">{item.label}</span>
                </div>

                {hasChildren && (
                    <motion.span
                        className="dt-sidebar__chevron"
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                    >
                        ▼
                    </motion.span>
                )}
            </div>

            <AnimatePresence>
                {hasChildren && isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="dt-sidebar__sub-menu"
                    >
                        <MenuList items={item.children!} level={level + 1} />
                    </motion.div>
                )}
            </AnimatePresence>
        </li>
    );
};

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
    isOpen,
    onClose,
    items,
    title = 'Menu'
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="dt-sidebar-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.aside
                        className="dt-sidebar"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className="dt-sidebar__header">
                            <h2 className="dt-sidebar__title">{title}</h2>
                            <button
                                className="dt-sidebar__close"
                                onClick={onClose}
                                aria-label="Close menu"
                            >
                                ×
                            </button>
                        </div>

                        <nav className="dt-sidebar__nav">
                            <MenuList items={items} />
                        </nav>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};
