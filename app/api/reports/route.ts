import Report from '@/models/Report';
import { NextRequest } from 'next/server';
import Gig from '@/models/Gig';
import { getNetRoyalties, getNetRoyaltiesForAllMembers } from '@/utils/royalties-utils';

export async function GET() {
  const reports = await Report.find().sort({ createdAt: -1 });

  return Response.json(reports, { status: 200 });
}

export async function POST(request: NextRequest) {
  const { name, grossRoyalties, isThereBookingFee, split, expenses, isLocked, gigIds } =
    await request.json();

  const netRoyalties = getNetRoyalties(grossRoyalties, isThereBookingFee, expenses);
  const netRoyaltiesPerPerson = getNetRoyaltiesForAllMembers(netRoyalties, split);

  const gig = await Gig.findById(gigIds[0]);

  const newReport = await Report.create({
    name,
    grossRoyalties,
    netRoyalties,
    netRoyaltiesPerPerson,
    isThereBookingFee,
    split,
    expenses,
    isLocked,
    gigIds,
    year: gig?.date.split('-')[0] ?? new Date().getFullYear().toString(),
  });

  for (const gigId of gigIds) {
    await Gig.findByIdAndUpdate(gigId, {
      reportId: newReport._id,
    });
  }

  return Response.json({ msg: 'New report created' }, { status: 201 });
}
