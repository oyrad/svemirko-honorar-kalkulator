import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IGig extends Document {
  city: string;
  venue: string;
  date: string;
  royalties: string;
  isPaidOut: boolean;
  reportId: string;
}

const gigSchema = new Schema<IGig>(
  {
    city: { type: String, required: true },
    venue: { type: String, required: true },
    date: { type: String, required: true },
    royalties: { type: String, required: true },
    isPaidOut: { type: Boolean, required: true },
    reportId: { type: String, required: true },
  },
  {
    timestamps: false,
  },
);

const Gig: Model<IGig> = mongoose.models.Gig || mongoose.model('Gig', gigSchema);

export default Gig;
