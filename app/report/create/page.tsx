'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, Suspense, useState } from 'react';
import { Expense, ReportTextData, SelectedGig } from '@/types/types';
import ReportForm from '@/app/_components/ReportForm';
import { REPORT_FORM_DEFAULT } from '@/constants/form-defaults';
import { formatReportFormData } from '@/libs/utils';
import Loader from '@/app/_atoms/Loader';

export default function CreateReport() {
  const [report, setReport] = useState<ReportTextData>(REPORT_FORM_DEFAULT);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [gigIds, setGigIds] = useState<SelectedGig[]>([]);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const router = useRouter();
  const from = useSearchParams().get('from');

  console.log(from);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setIsSubmitLoading(true);
    e.preventDefault();
    fetch('/api/reports', {
      method: 'POST',
      body: JSON.stringify(
        formatReportFormData({ ...report, expenses, gigIds }),
      ),
    })
      .then((res) => {
        if (res.status === 201) {
          router.push('/');
          setReport(REPORT_FORM_DEFAULT);
          setExpenses([]);
          setGigIds([]);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsSubmitLoading(false));
  }

  return (
    <Suspense fallback={<Loader />}>
      <ReportForm
        report={report}
        setReport={setReport}
        expenses={expenses}
        setExpenses={setExpenses}
        selectedGigs={gigIds}
        setSelectedGigs={setGigIds}
        isLoading={isSubmitLoading}
        handleSubmit={handleSubmit}
        backLink={from ? '/gigs' : '/'}
      />
    </Suspense>
  );
}
