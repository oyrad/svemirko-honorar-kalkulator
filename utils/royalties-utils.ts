import { Expense, Split } from '@/types/types';
import { getRates } from '@/utils/get-rates';

export function getTotalExpenses(expenses: Array<Expense>) {
  return expenses.reduce((acc, current) => acc + parseFloat(current.amount), 0);
}

export function getNetRoyalties(
  grossRoyalties: string,
  isThereBookingFee: boolean,
  expenses: Array<Expense>,
) {
  const totalBandFee = (parseFloat(grossRoyalties) || 0) * (isThereBookingFee ? 0.9 : 1);

  return expenses.reduce((acc, expense) => acc - (parseFloat(expense.amount) || 0), totalBandFee);
}

export function getGrossRoyaltiesByPerson(
  index: string,
  netRoyalties: number,
  rate: number,
  expenses: Array<Expense>,
) {
  let totalPayWithExpenses = netRoyalties * rate;
  expenses.forEach((expense) => {
    if (expense.whoPaid === index && expense.amount) {
      totalPayWithExpenses += parseInt(expense.amount);
    }
  });

  return totalPayWithExpenses;
}

export function getGrossRoyaltiesForAllMembers(
  netRoyalties: number,
  expenses: Array<Expense>,
  split: Split,
) {
  const rates = getRates(split);

  const markoPay = getGrossRoyaltiesByPerson('1', netRoyalties, rates.MARKO_RATE, expenses);
  const taliPay = getGrossRoyaltiesByPerson('2', netRoyalties, rates.TALI_RATE, expenses);
  const darioPay = getGrossRoyaltiesByPerson('3', netRoyalties, rates.DARIO_RATE, expenses);

  return [markoPay, taliPay, darioPay];
}

export function getNetRoyaltiesForAllMembers(netRoyalties: number, split: Split) {
  const rates = getRates(split);

  return [
    netRoyalties * rates.MARKO_RATE,
    netRoyalties * rates.TALI_RATE,
    netRoyalties * rates.DARIO_RATE,
  ];
}
