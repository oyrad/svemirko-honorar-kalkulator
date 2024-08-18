import connect from '@/libs/db';
import { NextRequest } from 'next/server';
import mongoose from 'mongoose';
import Report from '@/models/Report';
import NewReport from '@/emails/NewReport';
import { getNetRoyalties, getNetRoyaltiesByPerson } from '@/libs/utils';
import { Resend } from 'resend';
import Gig from '@/models/Gig';

const resend = new Resend(process.env.RESEND_KEY);

export async function PUT(request: NextRequest, context: any) {
  await connect();

  const { id } = context.params;

  const isIdValid = mongoose.isValidObjectId(id);
  if (!isIdValid) {
    return Response.json({ msg: 'Invalid id' }, { status: 404 });
  }

  const { name, split, expenses, grossRoyalties, isThereBookingFee, gigIds } =
    await Report.findByIdAndUpdate(
      id,
      {
        isLocked: true,
      },
      {
        timestamps: false,
      },
    );

  for (const gigId of gigIds) {
    await Gig.findByIdAndUpdate(gigId, {
      isPaidOut: true,
    });
  }

  const netRoyalties = getNetRoyalties(
    grossRoyalties,
    isThereBookingFee,
    expenses,
  );

  if (process.env.EMAILS === 'true') {
    const staticEmailOptions = {
      from: 'SVMRK <izracun@svmrk.co>',
      subject: `Izračun - ${name}`,
    };

    const staticEmailTemplateOptions = {
      name,
      url: `${process.env.CLIENT_URL}/report/${id}`,
    };

    await resend.emails.send({
      ...staticEmailOptions,
      to: 'markovukovic14@gmail.com',
      react: NewReport({
        ...staticEmailTemplateOptions,
        amount: getNetRoyaltiesByPerson(
          '1',
          netRoyalties,
          split === 'deal' ? 0.45 : 0.33,
          expenses,
        ).toFixed(2),
      }),
    });

    await resend.emails.send({
      ...staticEmailOptions,
      to: 'antobosn@icloud.com',
      react: NewReport({
        ...staticEmailTemplateOptions,
        amount: getNetRoyaltiesByPerson(
          '2',
          netRoyalties,
          split === 'deal' ? 0.275 : 0.33,
          expenses,
        ).toFixed(2),
      }),
    });

    await resend.emails.send({
      ...staticEmailOptions,
      to: 'dario.susanj2@gmail.com',
      react: NewReport({
        ...staticEmailTemplateOptions,
        amount: getNetRoyaltiesByPerson(
          '3',
          netRoyalties,
          split === 'deal' ? 0.275 : 0.33,
          expenses,
        ).toFixed(2),
      }),
    });
  }

  return Response.json({ msg: 'Report Locked' }, { status: 200 });
}
