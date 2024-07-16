'use client';

import { useParams, useRouter } from 'next/navigation';
import ArrowLeft from '@/app/_icons/ArrowLeft';
import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import Loader from '@/app/_atoms/Loader';
import Card from '@/app/_atoms/Card';
import ReportForm from '@/app/_components/ReportForm';
import { REPORT_FORM_DEFAULT } from '@/constants/form-defaults';
import { Expense, Report, ReportTextData } from '@/types/types';

export default function Create() {
  const [report, setReport] = useState<ReportTextData>(REPORT_FORM_DEFAULT);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/reports/${id}`)
      .then((res) => {
        if (res.status === 404) {
          throw new Error();
        }
        return res.json();
      })
      .then(({ expenses, ...data }: Report) => {
        setReport(data);
        setExpenses(expenses);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [id]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/reports/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...report, expenses }),
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

  if (isError)
    return (
      <Card className="flex gap-4 items-center">
        <Link href="/">
          <ArrowLeft />
        </Link>
        <p>{id} ne postoji.</p>
      </Card>
    );

  return (
    <ReportForm
      report={report}
      setReport={setReport}
      expenses={expenses}
      setExpenses={setExpenses}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      backLink={`/report/${id}`}
    />
  );
}
