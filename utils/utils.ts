import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Expense } from '@/types/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTotalExpenses(expenses: Expense[]) {
  return expenses.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
}

export function getNetRoyalties(
  grossRoyalties: string,
  isThereBookingFee: boolean,
  expenses: Expense[],
) {
  const totalBandFee =
    (parseFloat(grossRoyalties) || 0) * (isThereBookingFee ? 0.9 : 1);

  return expenses.reduce(
    (acc, expense) => acc - (parseFloat(expense.amount) || 0),
    totalBandFee,
  );
}
