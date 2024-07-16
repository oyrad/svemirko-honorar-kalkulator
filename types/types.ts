export type Split = 'deal' | 'equal';

export type Expense = {
  id: number;
  name: string;
  amount: string;
  whoPaid: string;
};

export type DatabaseProps = {
  _id: number;
  createdAt: string;
  updatedAt: string;
};

export type Report = {
  name: string;
  grossRoyalties: string;
  isThereBookingFee: boolean;
  split: Split;
  expenses: Expense[];
  note: string;
};

export type ReportDB = Report & DatabaseProps;

export type ReportTextData = Omit<Report, 'expenses'>;
