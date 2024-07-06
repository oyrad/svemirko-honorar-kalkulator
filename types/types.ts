export type Split = 'deal' | 'equal';

export type Expense = {
  id: number;
  name: string;
  amount: string;
  whoPaid: string;
};

export type Debt = {
  id: number;
  name: string;
  amount: string;
  from: string;
  to: string;
};

export type Report = {
  name: string;
  grossRoyalties: string;
  isThereBookingFee: boolean;
  split: Split;
  expenses: Expense[];
  debts: Debt[];
  netBandPay: number;
};
