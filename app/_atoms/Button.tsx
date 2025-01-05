import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function Button({
  className,
  children,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={cn(
        'flex space-x-1 items-center py-1 px-3 rounded-lg shadow transition-opacity duration-200 ease-in-out outline-none',
        className,
        rest.disabled && 'bg-gray-400 hover:opacity-100',
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
