import Report from '@/models/Report';
import { NextRequest } from 'next/server';
import connect from '@/libs/db';

export async function GET() {
  await connect();
  const reports = await Report.find().sort({ createdAt: -1 });

  return Response.json({ reports });
}

export async function POST(request: NextRequest) {
  await connect();
  const {
    name,
    grossRoyalties,
    isThereBookingFee,
    split,
    expenses,
    debts,
    netBandPay,
  } = await request.json();

  await Report.create({
    name: name.length === 0 ? new Date().toISOString() : name,
    grossRoyalties: grossRoyalties.length === 0 ? '0' : grossRoyalties,
    isThereBookingFee,
    split,
    expenses,
    debts,
    netBandPay,
  });

  return Response.json({ msg: 'New report created!' }, { status: 201 });
}
