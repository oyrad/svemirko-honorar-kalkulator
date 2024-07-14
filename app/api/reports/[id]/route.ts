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
