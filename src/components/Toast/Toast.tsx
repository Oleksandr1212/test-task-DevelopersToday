import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Toast.css';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastProps {
    message: string;
    type?: ToastType;
    duration?: number;
    onClose: () => void;
    isVisible?: boolean;
}

const icons: Record<ToastType, string> = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌',
};

export const Toast: React.FC<ToastProps> = ({
    message,
    type = 'info',
    duration = 3000,
    onClose,
    isVisible = true,
}) => {
    useEffect(() => {
        if (duration > 0 && isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, isVisible, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={`dt-toast dt-toast--${type}`}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    role="alert"
                >
                    <span className="dt-toast__icon">{icons[type]}</span>
                    <span className="dt-toast__message">{message}</span>
                    <button
                        className="dt-toast__close"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ×
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
