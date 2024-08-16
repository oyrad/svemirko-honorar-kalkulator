'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { Expense, GigDB, ReportTextData, SelectedGig } from '@/types/types';
import ReportForm from '@/app/_components/ReportForm';
import { REPORT_FORM_DEFAULT } from '@/constants/form-defaults';
import { formatReportFormData } from '@/libs/utils';
import NotFound from '@/app/_components/NotFound';

export default function CreateReport() {
  const [report, setReport] = useState<ReportTextData>(REPORT_FORM_DEFAULT);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [gigIds, setGigIds] = useState<SelectedGig[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const gigId = searchParams.get('gigId');

    if (gigId) {
      fetch(`/api/gigs/${gigId}`)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error('Gig not found');
          }
        })
        .then((data: GigDB) => {
          const gigNameString = `${data.city} - ${data.venue}`;
          setGigIds([
            {
              value: gigId,
              label: gigNameString,
            },
          ]);
          setReport((prevReport) => ({
            ...prevReport,
            grossRoyalties: data.royalties.split('€')[0],
            name: gigNameString,
          }));
        })
        .catch((err) => setError(err));
    }
  }, [searchParams]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setIsLoading(true);
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
      .finally(() => setIsLoading(false));
  }

  if (error) {
    return <NotFound backLink="/" text="Svirka ne postoji." />;
  }

  return (
    <ReportForm
      report={report}
      setReport={setReport}
      expenses={expenses}
      setExpenses={setExpenses}
      selectedGigs={gigIds}
      setSelectedGigs={setGigIds}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      backLink="/"
    />
  );
}
