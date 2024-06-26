import { ReactNode } from 'react';
import { cn } from '@/utils/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={cn('bg-white p-4 shadow-lg rounded-md card', className)}>
      {children}
    </div>
  );
}
