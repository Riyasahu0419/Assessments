import React from 'react';
import './Spinner.css';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'medium', className = '' }) => {
  return (
    <div className={`spinner spinner--${size} ${className}`}>
      <div className="spinner__circle"></div>
    </div>
  );
};
