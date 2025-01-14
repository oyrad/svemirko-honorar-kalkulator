import Gig from '@/models/Gig';

export const revalidate = 0;

export async function GET() {
  const gigs = await Gig.find();

  return Response.json(gigs, { status: 200 });
}
