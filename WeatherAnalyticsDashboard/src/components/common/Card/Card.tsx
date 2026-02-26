import React from 'react';
import './Card.css';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  clickable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  onClick,
  className = '',
  clickable = false,
}) => {
  return (
    <div
      className={`card ${clickable ? 'card--clickable' : ''} ${className}`}
      onClick={onClick}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (clickable && (e.key === 'Enter' || e.key === ' ')) {
          onClick?.();
        }
      }}
    >
      {children}
    </div>
  );
};
