import connectToDatabase from '@/libs/db';

export async function register() {
  await connectToDatabase();
}
