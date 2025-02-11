import { NextRequest } from 'next/server';
import mongoose from 'mongoose';
import Report from '@/models/Report';
import Gig from '@/models/Gig';
import { getNetRoyalties } from '@/utils/royalties-utils';
import { sendReportEmails } from '@/emails/send-report-emails';

export async function PUT(request: NextRequest, context: any) {
  const { id } = context.params;

  const isIdValid = mongoose.isValidObjectId(id);
  if (!isIdValid) {
    return Response.json({ msg: 'Invalid id' }, { status: 400 });
  }

  const report = await Report.findByIdAndUpdate(
    id,
    {
      isLocked: true,
    },
    {
      timestamps: false,
    },
  );

  if (!report) {
    return Response.json({ msg: 'Report not found' }, { status: 404 });
  }

  const { name, split, expenses, grossRoyalties, isThereBookingFee, gigIds } = report;

  for (const gigId of gigIds) {
    await Gig.findByIdAndUpdate(gigId, {
      isPaidOut: true,
    });
  }

  const netRoyalties = getNetRoyalties(grossRoyalties, isThereBookingFee, expenses);

  `${process.env.CLIENT_URL}/report/${id}`;

  if (process.env.EMAILS === 'true') {
    void sendReportEmails({
      reportId: id,
      reportName: name,
      netRoyalties,
      expenses,
      split,
    });
  }

  return Response.json({ msg: 'Report Locked' }, { status: 200 });
}
