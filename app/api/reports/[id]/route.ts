import connect from '@/libs/db';
import { NextRequest } from 'next/server';
import Report from '@/models/Report';

export async function GET(request: NextRequest, { params }) {
  await connect();
  const report = await Report.findById(params.id);

  return Response.json(report, { status: 200 });
}
