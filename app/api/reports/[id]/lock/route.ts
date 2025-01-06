import connect from '@/libs/db';
import { NextRequest } from 'next/server';
import mongoose from 'mongoose';
import Report from '@/models/Report';
import Gig from '@/models/Gig';
import { getNetRoyalties } from '@/utils/royalties-utils';
import { sendReportEmails } from '@/emails/send-report-emails';

export async function PUT(request: NextRequest, context: any) {
  await connect();

  const { id } = context.params;

  const isIdValid = mongoose.isValidObjectId(id);
  if (!isIdValid) {
    return Response.json({ msg: 'Invalid id' }, { status: 400 });
  }

  const { name, split, expenses, grossRoyalties, isThereBookingFee, gigIds } =
    await Report.findByIdAndUpdate(
      id,
      {
        isLocked: true,
      },
      {
        timestamps: false,
      },
    );

  for (const gigId of gigIds) {
    await Gig.findByIdAndUpdate(gigId, {
      isPaidOut: true,
    });
  }

  const netRoyalties = getNetRoyalties(grossRoyalties, isThereBookingFee, expenses);

  if (process.env.EMAILS === 'true') {
    void sendReportEmails({
      reportName: name,
      netRoyalties,
      expenses,
      split,
    });
  }

  return Response.json({ msg: 'Report Locked' }, { status: 200 });
}
