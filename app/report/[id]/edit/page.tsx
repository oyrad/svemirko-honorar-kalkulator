'use client';

import { useParams, useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import Loader from '@/app/_atoms/Loader';
import ReportForm from '@/app/_components/ReportForm';
import { REPORT_FORM_DEFAULT } from '@/constants/form-defaults';
import { Expense, GigDB, ReportTextData, SelectedGig } from '@/types/types';
import { formatReportFormData } from '@/libs/utils';
import NotFound from '@/app/_components/NotFound';
import { useGigsQuery } from '@/hooks/useGigsQuery';

export default function EditReport() {
  const [report, setReport] = useState<ReportTextData>(REPORT_FORM_DEFAULT);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [gigIds, setGigIds] = useState<SelectedGig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const router = useRouter();
  const { id } = useParams();

  const { data: gigs } = useGigsQuery();

  useEffect(() => {
    fetch(`/api/reports/${id}`)
      .then((res) => {
        if (res.status === 404) {
          throw new Error();
        }
        return res.json();
      })
      .then(({ gigIds, expenses, ...data }) => {
        setReport(data as ReportTextData);
        setExpenses(expenses);
        if (gigs) {
          setGigIds(
            gigIds.map((gig: string) => {
              const currentGig = gigs.find(
                (g: GigDB) => g._id.toString() === gig,
              );
              return {
                label: `${currentGig.city} - ${currentGig.venue}`,
                value: currentGig._id,
              };
            }),
          );
        }
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, [gigs, id]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    fetch(`/api/reports/${id}`, {
      method: 'PUT',
      body: JSON.stringify(
        formatReportFormData({ ...report, expenses, gigIds }),
      ),
    })
      .then((res) => {
        if (res.status === 200) {
          router.push(`/report/${id}`);
          setReport(REPORT_FORM_DEFAULT);
          setExpenses([]);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }

  if (isLoading) return <Loader />;

  if (isError) return <NotFound backLink="/" text="Izračun ne postoji." />;

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
      backLink={`/report/${id}`}
    />
  );
}
