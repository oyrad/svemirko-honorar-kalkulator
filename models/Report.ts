import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI);

const reportSchema = new mongoose.Schema(
  {
    name: String,
    grossRoyalties: String,
    isThereBookingFee: Boolean,
    split: String,
    expenses: [
      {
        name: String,
        amount: Number,
        whoPaid: String,
      },
    ],
    debts: [
      {
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

const Report = mongoose.model('Report', reportSchema);

export default Report;
