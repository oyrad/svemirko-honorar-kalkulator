export type Report = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  year: string;
  grossRoyalties: string;
  netRoyalties: string;
  netRoyaltiesPerPerson: Array<string>;
  isThereBookingFee: boolean;
  split: Split;
  expenses: Array<Expense>;
  isLocked: boolean;
  gigIds: Array<string>;
};

export type Gig = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  city: string;
  venue: string;
  date: string;
  royalties: string;
  isPaidOut: boolean;
  reportId: string;
};

export type Split = 'deal' | 'equal';

export type Expense = {
  id: number;
  name: string;
  amount: string;
  whoPaid: string;
};

export interface SelectedGig {
  label: string;
  value: string;
}
