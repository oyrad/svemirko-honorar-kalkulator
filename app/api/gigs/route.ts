import connect from '@/libs/db';
import Gig from '@/models/Gig';

export const revalidate = 0;

export async function GET() {
  await connect();

  const gigs = await Gig.find();

  return Response.json(gigs, { status: 200 });
}
