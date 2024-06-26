import { ReactNode } from 'react';
import { cn } from '@/utils/utils';

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

export default function Button({
  onClick,
  children,
  className = '',
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex space-x-1 items-center bg-slate-100 py-1 px-3 rounded-xl shadow hover:bg-slate-200 transition-colors duration-200 ease-in-out',
        className,
      )}
    >
      {children}
    </button>
  );
}
