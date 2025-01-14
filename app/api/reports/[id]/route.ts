import { NextRequest } from 'next/server';
import Report from '@/models/Report';
import mongoose from 'mongoose';
import Gig from '@/models/Gig';
import { getNetRoyalties, getNetRoyaltiesForAllMembers } from '@/utils/royalties-utils';

export async function GET(request: NextRequest, context: any) {
  const isIdValid = mongoose.isValidObjectId(context.params.id);
  if (!isIdValid) {
    return Response.json({ msg: 'Invalid id' }, { status: 400 });
  }

  const report = await Report.findById(context.params.id);

  if (!report) {
    return Response.json({ msg: 'Report not found' }, { status: 404 });
  }
  return Response.json(report, { status: 200 });
}

export async function DELETE(request: NextRequest, context: any) {
  await Report.findByIdAndDelete(context.params.id);

  const associatedGigs = await Gig.find({ reportId: context.params.id });

  if (associatedGigs) {
    for (const gig of associatedGigs) {
      await Gig.findByIdAndUpdate(gig._id, { reportId: '' });
    }
  }

  return Response.json({ msg: 'Report deleted' }, { status: 200 });
}

export async function PUT(request: NextRequest, context: any) {
  const isIdValid = mongoose.isValidObjectId(context.params.id);
  if (!isIdValid) {
    return Response.json({ msg: 'Invalid id' }, { status: 404 });
  }

  const { name, grossRoyalties, isThereBookingFee, split, expenses, gigIds } = await request.json();

  const gig = await Gig.findById(gigIds[0]);

  const netRoyalties = getNetRoyalties(grossRoyalties, isThereBookingFee, expenses);
  const netRoyaltiesPerPerson = getNetRoyaltiesForAllMembers(netRoyalties, expenses);

  const newReport = await Report.findByIdAndUpdate(context.params.id, {
    name,
    grossRoyalties,
    netRoyalties,
    netRoyaltiesPerPerson,
    isThereBookingFee,
    split,
    expenses,
    gigIds,
    year: gig?.date.split('-')[0] ?? new Date().getFullYear().toString(),
  });

  const report = await Report.findById(context.params.id);

  const previousGigIds = report?.gigIds ?? [];

  for (const gigId of previousGigIds) {
    if (!gigIds.includes(gigId)) {
      await Gig.findByIdAndUpdate(gigId, { reportId: '' });
    }
  }

  for (const gigId of gigIds) {
    await Gig.findByIdAndUpdate(gigId, {
      reportId: newReport?._id ?? '',
    });
  }

  return Response.json({ msg: 'Report updated' }, { status: 200 });
}
