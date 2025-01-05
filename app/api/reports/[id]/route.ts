import connect from '@/libs/db';
import { NextRequest } from 'next/server';
import Report from '@/models/Report';
import mongoose from 'mongoose';
import Gig from '@/models/Gig';

export async function GET(request: NextRequest, context: any) {
  await connect();

  const isIdValid = mongoose.isValidObjectId(context.params.id);
  if (!isIdValid) {
    return Response.json({ msg: 'Invalid id' }, { status: 404 });
  }

  const report = await Report.findById(context.params.id);

  const gigs = await Gig.find();

  const selectedGigs = report.gigIds.map((id: string) => {
    const currentGig = gigs.find((g) => g._id.toString() === id);

    if (currentGig) {
      return {
        label: `${currentGig.city} - ${currentGig.venue}`,
        value: currentGig._id,
      };
    }
  });

  return Response.json(
    {
      ...report._doc,
      selectedGigs,
    },
    { status: 200 },
  );
}

export async function DELETE(request: NextRequest, context: any) {
  await connect();
  await Report.findByIdAndDelete(context.params.id);

  const associatedGigs = await Gig.find({ reportId: context.params.id });

  if (associatedGigs) {
    for (const gig of associatedGigs) {
      await Gig.findByIdAndUpdate(gig._id, { reportId: '' });
    }
  }

  console.log(context.params.id);

  return Response.json({ msg: 'Report deleted' }, { status: 200 });
}

export async function PUT(request: NextRequest, context: any) {
  await connect();

  const isIdValid = mongoose.isValidObjectId(context.params.id);
  if (!isIdValid) {
    return Response.json({ msg: 'Invalid id' }, { status: 404 });
  }

  const { name, grossRoyalties, isThereBookingFee, split, expenses, gigIds } =
    await request.json();

  await Report.findByIdAndUpdate(context.params.id, {
    name,
    grossRoyalties,
    isThereBookingFee,
    split,
    expenses,
    gigIds,
  });

  return Response.json({ msg: 'Report updated' }, { status: 200 });
}
