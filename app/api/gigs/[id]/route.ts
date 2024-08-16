import connect from '@/libs/db';
import { NextRequest } from 'next/server';
import Gig from '@/models/Gig';

export async function GET(request: NextRequest, context: any) {
  await connect();

  const { id } = context.params;
  const gig = await Gig.findById(id);

  return Response.json(gig, { status: 200 });
}
