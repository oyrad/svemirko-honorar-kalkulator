export type DatabaseProps = {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type Report = {
  name: string;
  grossRoyalties: string;
  netRoyalties: string;
  netRoyaltiesPerPerson: Array<string>;
  isThereBookingFee: boolean;
  split: Split;
  expenses: Array<Expense>;
  isLocked: boolean;
  gigIds: Array<string>;
};

export type ReportDB = Report & DatabaseProps;

export type Split = 'deal' | 'equal';

export type Expense = {
  id: number;
  name: string;
  amount: string;
  whoPaid: string;
};

export type Gig = {
  city: string;
  venue: string;
  date: string;
  royalties: string;
  isPaidOut: boolean;
  reportId: string;
};

export type GigDB = Gig & DatabaseProps;

export interface SelectedGig {
  label: string;
  value: string;
}
