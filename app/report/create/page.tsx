'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { Expense, Split } from '@/types/types';
import ReportForm from '@/app/_components/ReportForm';

export default function Create() {
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [grossRoyalties, setGrossRoyalties] = useState('');
  const [isThereBookingFee, setIsThereBookingFee] = useState(false);
  const [split, setSplit] = useState<Split>('deal');
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [note, setNote] = useState('');

  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/reports`, {
      method: 'POST',
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
        if (res.status === 201) {
          router.push('/');
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
      backLink="/"
      handleSubmit={handleSubmit}
    />
  );
}
