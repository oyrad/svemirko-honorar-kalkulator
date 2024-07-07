import mongoose from 'mongoose';

export default async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error(error);
  }
}
