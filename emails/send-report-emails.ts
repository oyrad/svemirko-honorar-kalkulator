import NewReport from '@/emails/NewReport';
import { getNetRoyaltiesForAllMembers } from '@/utils/royalties-utils';
import { Resend } from 'resend';
import { Expense, Split } from '@/types/types';
import { id } from 'postcss-selector-parser';

const resend = new Resend(process.env.RESEND_KEY);

interface SendReportEmailsParams {
  reportName: string;
  netRoyalties: number;
  expenses: Array<Expense>;
  split: Split;
}

export async function sendReportEmails({
  reportName,
  netRoyalties,
  expenses,
  split,
}: SendReportEmailsParams) {
  const [markoPay, taliPay, darioPay] = getNetRoyaltiesForAllMembers(netRoyalties, expenses, split);

  const staticEmailOptions = {
    from: 'SVMRK <izracun@svmrk.co>',
    subject: `Izračun - ${reportName}`,
  };

  const staticEmailTemplateOptions = {
    name: reportName,
    url: `${process.env.CLIENT_URL}/report/${id}`,
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
