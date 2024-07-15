import connect from '@/libs/db';
import { NextRequest } from 'next/server';
import Report from '@/models/Report';
import mongoose from 'mongoose';

export async function GET(request: NextRequest, context: any) {
  await connect();

  const isIdValid = mongoose.isValidObjectId(context.params.id);
  if (!isIdValid) {
    return Response.json({ msg: 'Invalid id' }, { status: 404 });
  }

  const report = await Report.findById(context.params.id);

  return Response.json(report, { status: 200 });
}

export async function DELETE(request: NextRequest, context: any) {
  await connect();
  await Report.findByIdAndDelete(context.params.id);

  return Response.json({ msg: 'Report deleted' }, { status: 200 });
}

export async function PUT(request: NextRequest, context: any) {
  await connect();

  const isIdValid = mongoose.isValidObjectId(context.params.id);
  if (!isIdValid) {
    return Response.json({ msg: 'Invalid id' }, { status: 404 });
  }

  const { name, grossRoyalties, isThereBookingFee, split, expenses, note } =
    await request.json();

  await Report.findByIdAndUpdate(context.params.id, {
    name: name.length === 0 ? new Date().toISOString() : name,
    grossRoyalties: grossRoyalties.length === 0 ? '0' : grossRoyalties,
    isThereBookingFee,
    split,
    expenses: expenses.filter((expense) => parseFloat(expense.amount) > 0),
    note,
  });

  return Response.json({ msg: 'Report updated' }, { status: 200 });
}
