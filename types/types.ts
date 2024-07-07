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
  _id: string;
  name: string;
  grossRoyalties: string;
  isThereBookingFee: boolean;
  split: Split;
  expenses: Expense[];
  debts: Debt[];
  netBandPay: number;
  createdAt: string;
};
