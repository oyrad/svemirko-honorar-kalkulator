import NewReport from '@/emails/NewReport';
import { getGrossRoyaltiesForAllMembers } from '@/utils/royalties-utils';
import { Resend } from 'resend';
import { Expense, Split } from '@/types/types';

const resend = new Resend(process.env.RESEND_KEY);

interface SendReportEmailsParams {
  reportId: string;
  reportName: string;
  netRoyalties: number;
  expenses: Array<Expense>;
  split: Split;
}

export async function sendReportEmails({
  reportId,
  reportName,
  netRoyalties,
  expenses,
  split,
}: SendReportEmailsParams) {
  const [markoPay, taliPay, darioPay] = getGrossRoyaltiesForAllMembers(
    netRoyalties,
    expenses,
    split,
  );

  const staticEmailOptions = {
    from: 'SVMRK <izracun@svmrk.co>',
    subject: `Izračun - ${reportName}`,
  };

  const staticEmailTemplateOptions = {
    name: reportName,
    url: `${process.env.CLIENT_URL}/report/${reportId}`,
  };

  await resend.emails.send({
    ...staticEmailOptions,
    to: 'markovukovic14@gmail.com',
    react: NewReport({
      ...staticEmailTemplateOptions,
      amount: markoPay.toFixed(2),
    }),
  });

  await resend.emails.send({
    ...staticEmailOptions,
    to: 'antobosn@icloud.com',
    react: NewReport({
      ...staticEmailTemplateOptions,
      amount: taliPay.toFixed(2),
    }),
  });

  await resend.emails.send({
    ...staticEmailOptions,
    to: 'dario.susanj2@gmail.com',
    react: NewReport({
      ...staticEmailTemplateOptions,
      amount: darioPay.toFixed(2),
    }),
  });
}
