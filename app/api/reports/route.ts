import Report from '@/models/Report';
import { NextRequest } from 'next/server';
import connect from '@/libs/db';

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
  } = await request.json();

  await Report.create({
    name,
    grossRoyalties,
    isThereBookingFee,
    split,
    expenses,
    note,
    isLocked,
  });

  return Response.json({ msg: 'New report created' }, { status: 201 });
}
