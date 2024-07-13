import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Expense } from '@/types/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTotalExpenses(expenses: Expense[]) {
  return expenses.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
}
