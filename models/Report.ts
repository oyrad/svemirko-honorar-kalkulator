import mongoose, { Schema } from 'mongoose';

const reportSchema = new Schema(
  {
    name: String,
    grossRoyalties: String,
    isThereBookingFee: Boolean,
    split: String,
    expenses: [
      {
        id: Number,
        name: String,
        amount: Number,
        whoPaid: String,
      },
    ],
    debts: [
      {
        id: Number,
        name: String,
        amount: Number,
        from: String,
        to: String,
      },
    ],
    netBandPay: Number,
  },
  {
    timestamps: true,
  },
);

const Report = mongoose.models.Report || mongoose.model('Report', reportSchema);

export default Report;
