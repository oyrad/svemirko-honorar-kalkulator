import mongoose, { Schema } from 'mongoose';

const gigSchema = new Schema(
  {
    city: String,
    venue: String,
    date: String,
    royalties: String,
    isPaidOut: Boolean,
    reportId: String,
  },
  {
    timestamps: false,
  },
);

const Gig = mongoose.models.Gig || mongoose.model('Gig', gigSchema);

export default Gig;
