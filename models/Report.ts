import mongoose, { Schema } from 'mongoose';

const reportSchema = new Schema(
  {
    name: String,
    grossRoyalties: String,
    netRoyalties: Number,
    netRoyaltiesPerPerson: [Number],
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
    isLocked: Boolean,
    gigIds: [String],
    year: String,
  },
  {
    timestamps: true,
  },
);

const Report = mongoose.models.Report || mongoose.model('Report', reportSchema);

export default Report;
