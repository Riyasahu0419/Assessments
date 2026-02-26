import React from 'react';
import './Button.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
}) => {
  return (
    <button
      type={type}
      className={`button button--${variant} ${className} ${loading ? 'button--loading' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? <span className="button__spinner"></span> : children}
    </button>
  );
};
