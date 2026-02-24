import React, { useState } from 'react';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  clearable?: boolean;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = 'text', clearable, error, value, onChange, className = '', ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (isPasswordVisible ? 'text' : 'password') : type;

    const handleClear = () => {
      if (onChange) {
        const event = {
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    return (
      <div className={`input-container ${className}`}>
        {label && <label className="input-label">{label}</label>}
        <div className="input-wrapper">
          <input
            {...props}
            ref={ref}
            type={inputType}
            value={value}
            onChange={onChange}
            className={`input-field ${error ? 'input-field-error' : ''} ${isPassword || clearable ? 'input-field-with-icon' : ''
              }`}
          />
          <div className="input-icons">
            {clearable && value && (
              <button
                type="button"
                className="input-icon-btn clear-btn"
                onClick={handleClear}
                aria-label="Clear input"
              >
                ✕
              </button>
            )}
            {isPassword && (
              <button
                type="button"
                className="input-icon-btn toggle-password-btn"
                onClick={togglePasswordVisibility}
                aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
              >
                {isPasswordVisible ? '👁️' : '🔒'}
              </button>
            )}
          </div>
        </div>
        {error && <span className="input-error-msg">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
