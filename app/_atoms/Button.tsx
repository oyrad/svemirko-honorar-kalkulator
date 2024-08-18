import { ReactNode } from 'react';
import { cn } from '@/libs/utils';

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

export default function Button({
  onClick,
  children,
  type = 'button',
  className = '',
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(
        'flex space-x-1 items-center py-1 px-3 rounded-lg shadow transition-opacity duration-200 ease-in-out outline-none',
        className,
        disabled && 'bg-gray-400 hover:opacity-100',
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
