import mongoose from 'mongoose';

let isConnected = false;

export default async function connectToDatabase() {
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI!);
    console.log(db.connections);
    isConnected = db.connections[0].readyState === 1;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
}
