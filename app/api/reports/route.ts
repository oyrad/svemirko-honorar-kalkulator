import Report from '@/models/Report';
import { NextRequest } from 'next/server';
import connect from '@/libs/db';
import { Expense } from '@/types/types';
import { Resend } from 'resend';
import NewReport from '@/emails/NewReport';
import { getNetRoyalties, getNetRoyaltiesByPerson } from '@/libs/utils';

const resend = new Resend('re_NghMorha_jD3iEH2pAozU7ru6VnbvuH6W');

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
    name: name.length === 0 ? new Date().toISOString() : name,
    grossRoyalties: grossRoyalties.length === 0 ? '0' : grossRoyalties,
    isThereBookingFee,
    split,
    expenses: expenses.filter(
      (expense: Expense) => parseFloat(expense.amount) > 0,
    ),
    note,
  });

  await resend.emails.send({
    from: 'SVMRK <isplata@svmrk.co>',
    to: 'dsf997@gmail.com',
    subject: `Izračun - ${name}`,
    react: NewReport({
      url: `${process.env.CLIENT_URL}/report/${newReport._id}`,
      amount: getNetRoyaltiesByPerson(
        '3',
        getNetRoyalties(grossRoyalties, isThereBookingFee, expenses),
        0.275,
        expenses,
      ),
      name,
    }),
  });

  return Response.json({ msg: 'New report created' }, { status: 201 });
}
