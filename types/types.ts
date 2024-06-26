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
