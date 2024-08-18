import Report from '@/models/Report';
import { NextRequest } from 'next/server';
import connect from '@/libs/db';
import Gig from '@/models/Gig';

export async function GET() {
  await connect();
  const reports = await Report.find().sort({ createdAt: -1 });

  return Response.json(reports, { status: 200 });
}

export async function POST(request: NextRequest) {
  await connect();
  const {
    name,
    grossRoyalties,
    isThereBookingFee,
    split,
    expenses,
    note,
    isLocked,
    gigIds,
  } = await request.json();

  const newReport = await Report.create({
    name,
    grossRoyalties,
    isThereBookingFee,
    split,
    expenses,
    note,
    isLocked,
    gigIds,
  });

  for (const gigId of gigIds) {
    await Gig.findByIdAndUpdate(gigId, {
      reportId: newReport._id,
    });
  }

  return Response.json({ msg: 'New report created' }, { status: 201 });
}
