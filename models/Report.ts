import mongoose, { Schema } from 'mongoose';

const reportSchema = new Schema(
  {
    name: String,
    grossRoyalties: String,
    isThereBookingFee: Boolean,
    split: String,
    note: String,
    expenses: [
      {
        id: Number,
        name: String,
        amount: Number,
        whoPaid: String,
      },
    ],
    isLocked: Boolean,
    gigIds: [String],
  },
  {
    timestamps: true,
  },
);

const Report = mongoose.models.Report || mongoose.model('Report', reportSchema);

export default Report;
