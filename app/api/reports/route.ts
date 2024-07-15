import Report from '@/models/Report';
import { NextRequest } from 'next/server';
import connect from '@/libs/db';
import { Expense } from '@/types/types';

export async function GET() {
  await connect();
  const reports = await Report.find().sort({ createdAt: -1 });

  return Response.json(reports, { status: 200 });
}

export async function POST(request: NextRequest) {
  await connect();
  const { name, grossRoyalties, isThereBookingFee, split, expenses, note } =
    await request.json();

  await Report.create({
    name: name.length === 0 ? new Date().toISOString() : name,
    grossRoyalties: grossRoyalties.length === 0 ? '0' : grossRoyalties,
    isThereBookingFee,
    split,
    expenses: expenses.filter(
      (expense: Expense) => parseFloat(expense.amount) > 0,
    ),
    note,
  });

  return Response.json({ msg: 'New report created' }, { status: 201 });
}
