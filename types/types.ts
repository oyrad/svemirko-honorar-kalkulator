export type Split = 'deal' | 'equal';

export type Expense = {
  id: number;
  name: string;
  amount: string;
  whoPaid: string;
};

export type Report = {
  _id: string;
  name: string;
  grossRoyalties: string;
  isThereBookingFee: boolean;
  split: Split;
  expenses: Expense[];
  netBandPay: number;
  createdAt: string;
};
