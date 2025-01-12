import mongoose, { Document, Model, Schema } from 'mongoose';

interface IExpense {
  id: number;
  name: string;
  amount: string;
  whoPaid: string;
}

export interface IReport extends Document {
  name: string;
  grossRoyalties: string;
  netRoyalties: number;
  netRoyaltiesPerPerson: number[];
  isThereBookingFee: boolean;
  split: 'deal' | 'equal';
  expenses: IExpense[];
  isLocked: boolean;
  gigIds: string[];
  year: string;
}

const reportSchema = new Schema<IReport>(
  {
    name: { type: String, required: true },
    grossRoyalties: { type: String, required: true },
    netRoyalties: { type: Number, required: true },
    netRoyaltiesPerPerson: { type: [Number], required: true },
    isThereBookingFee: { type: Boolean, required: true },
    split: { type: String, required: true },
    expenses: [
      {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        whoPaid: { type: String, required: true },
      },
    ],
    isLocked: { type: Boolean, required: true },
    gigIds: { type: [String], required: true },
    year: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const Report: Model<IReport> =
  mongoose.models.Report || mongoose.model<IReport>('Report', reportSchema);

export default Report;
