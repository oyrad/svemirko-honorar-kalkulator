'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { Expense, ReportTextData } from '@/types/types';
import ReportForm from '@/app/_components/ReportForm';
import { REPORT_FORM_DEFAULT } from '@/constants/form-defaults';
import { formatReportFormData } from '@/libs/utils';

export default function Create() {
  const [report, setReport] = useState<ReportTextData>(REPORT_FORM_DEFAULT);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    fetch('/api/reports', {
      method: 'POST',
      body: JSON.stringify(formatReportFormData({ ...report, expenses })),
    })
      .then((res) => {
        if (res.status === 201) {
          router.push('/');
          setReport(REPORT_FORM_DEFAULT);
          setExpenses([]);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }

  return (
    <ReportForm
      report={report}
      setReport={setReport}
      expenses={expenses}
      setExpenses={setExpenses}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      backLink="/"
    />
  );
}
