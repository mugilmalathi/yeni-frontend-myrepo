import React from 'react';
import { cn } from '@/lib/utils';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        'button',
        `button--${variant}`,
        `button--${size}`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};