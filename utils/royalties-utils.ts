import { Expense } from '@/types/types';

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
