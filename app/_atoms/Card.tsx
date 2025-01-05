import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
  return (
    <section
      className={cn(
        'bg-white p-4 shadow-lg rounded-md dark:bg-dark-card-background dark:text-white',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </section>
  );
}
