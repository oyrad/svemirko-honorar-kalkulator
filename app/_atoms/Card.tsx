import { ReactNode } from 'react';
import { cn } from '@/utils/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      className={cn('bg-white p-4 shadow-lg rounded-md card', className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
