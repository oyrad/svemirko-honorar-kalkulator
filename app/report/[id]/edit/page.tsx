'use client';

import { useParams, useRouter } from 'next/navigation';
import ArrowLeft from '@/app/_icons/ArrowLeft';
import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { Expense, Split } from '@/types/types';
import Loader from '@/app/_atoms/Loader';
import Card from '@/app/_atoms/Card';
import ReportForm from '@/app/_components/ReportForm';

export default function Create() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [name, setName] = useState('');
  const [grossRoyalties, setGrossRoyalties] = useState('');
  const [isThereBookingFee, setIsThereBookingFee] = useState(false);
  const [split, setSplit] = useState<Split>('deal');
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [note, setNote] = useState('');

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
      .then((data) => {
        setName(data.name);
        setGrossRoyalties(data.grossRoyalties);
        setIsThereBookingFee(data.isThereBookingFee);
        setSplit(data.split);
        setExpenses(data.expenses);
        setNote(data.note);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [id]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/reports/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name,
        grossRoyalties,
        expenses,
        isThereBookingFee,
        split,
        note,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          router.push(`/report/${id}`);
          setName('');
          setGrossRoyalties('');
          setExpenses([]);
          setIsThereBookingFee(false);
          setNote('');
          setSplit('deal');
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
      name={name}
      setName={setName}
      grossRoyalties={grossRoyalties}
      setGrossRoyalties={setGrossRoyalties}
      isThereBookingFee={isThereBookingFee}
      setIsThereBookingFee={setIsThereBookingFee}
      split={split}
      setSplit={setSplit}
      expenses={expenses}
      setExpenses={setExpenses}
      note={note}
      setNote={setNote}
      isLoading={isLoading}
      backLink={`/report/${id}`}
      handleSubmit={handleSubmit}
    />
  );
}
