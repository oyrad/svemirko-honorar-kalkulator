import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white p-4 shadow-lg rounded-md ${className}`}>
      {children}
    </div>
  );
}
