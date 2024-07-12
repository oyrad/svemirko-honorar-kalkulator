import connect from '@/libs/db';
import { NextRequest } from 'next/server';
import Report from '@/models/Report';
import mongoose from 'mongoose';

export async function GET(request: NextRequest, { params }) {
  await connect();

  const isIdValid = mongoose.isValidObjectId(params.id);
  if (!isIdValid) {
    return Response.json({ msg: 'Invalid id' }, { status: 404 });
  }

  const report = await Report.findById(params.id);

  return Response.json(report, { status: 200 });
}
