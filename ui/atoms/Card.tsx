import { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Card({ children, className = '' }: PropsWithChildren<CardProps>) {
  return (
    <section
      className={cn(
        'bg-white p-4 shadow-lg rounded-md dark:bg-dark-card-background dark:text-white',
        className,
      )}
    >
      {children}
    </section>
  );
}
