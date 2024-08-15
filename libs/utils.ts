import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Expense, Report } from '@/types/types';

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

export function getNetRoyaltiesByPerson(
  index: string,
  netRoyalties: number,
  rate: number,
  expenses: Expense[],
) {
  let totalPayWithExpenses = netRoyalties * rate;
  expenses.forEach((expense) => {
    if (expense.whoPaid === index && expense.amount) {
      totalPayWithExpenses += parseInt(expense.amount);
    }
  });

  return totalPayWithExpenses;
}

export function formatReportFormData(report: Report) {
  return {
    ...report,
    name: report.name.length === 0 ? new Date().toISOString() : report.name,
    grossRoyalties:
      report.grossRoyalties.length === 0 ? '0' : report.grossRoyalties,
    expenses: report.expenses.filter(
      (expense: Expense) => parseFloat(expense.amount) > 0,
    ),
    gigIds: report.gigIds.map((gig) => gig.value),
  };
}
