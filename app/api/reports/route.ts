import Report from '@/models/Report';
import { NextRequest } from 'next/server';
import connect from '@/libs/db';
import { Resend } from 'resend';
import NewReport from '@/emails/NewReport';
import { getNetRoyalties, getNetRoyaltiesByPerson } from '@/libs/utils';

const resend = new Resend(process.env.RESEND_KEY);

export async function GET() {
  await connect();
  const reports = await Report.find().sort({ createdAt: -1 });

  return Response.json(reports, { status: 200 });
}

export async function POST(request: NextRequest) {
  await connect();
  const { name, grossRoyalties, isThereBookingFee, split, expenses, note } =
    await request.json();

  const newReport = await Report.create({
    name,
    grossRoyalties,
    isThereBookingFee,
    split,
    expenses,
    note,
  });

  await resend.emails.send({
    from: 'SVMRK <isplata@svmrk.co>',
    to: 'dsf997@gmail.com',
    subject: `Izračun - ${name}`,
    react: NewReport({
      name,
      url: `${process.env.CLIENT_URL}/report/${newReport._id}`,
      amount: getNetRoyaltiesByPerson(
        '3',
        getNetRoyalties(grossRoyalties, isThereBookingFee, expenses),
        0.275,
        expenses,
      ).toFixed(2),
    }),
  });

  return Response.json({ msg: 'New report created' }, { status: 201 });
}
