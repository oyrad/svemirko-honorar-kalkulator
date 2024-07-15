'use client';

import BasicInfo from '@/app/report/create/_components/BasicInfo';
import Settings from '@/app/report/create/_components/Settings';
import ExpenseList from '@/app/report/create/_components/ExpenseList';
import Earnings from '@/app/report/create/_components/Earnings';
import { useRouter } from 'next/navigation';
import Button from '@/app/_atoms/Button';
import ArrowLeft from '@/app/_icons/ArrowLeft';
import { FormEvent, useMemo, useState } from 'react';
import { MoonLoader } from 'react-spinners';
import NotesInput from '@/app/report/create/_components/NoteInput';
import Link from 'next/link';
import { FLAGS } from '@/libs/flags';
import { Expense, Split } from '@/types/types';
import { getNetRoyalties } from '@/utils/utils';

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

  const netRoyalties = useMemo(
    () => getNetRoyalties(grossRoyalties, isThereBookingFee, expenses),
    [expenses, grossRoyalties, isThereBookingFee],
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Link href="/">
          <ArrowLeft />
        </Link>
        <Button
          type="submit"
          className="font-medium bg-gradient-to-r from-green-300 to-green-400 dark:from-green-400 dark:to-green-500 w-24 h-8 justify-center hover:opacity-85"
        >
          {isLoading ? <MoonLoader size={16} /> : 'Spremi'}
        </Button>
      </div>
      <BasicInfo
        name={name}
        setName={setName}
        grossRoyalties={grossRoyalties}
        setGrossRoyalties={setGrossRoyalties}
      />
      <Settings
        isThereBookingFee={isThereBookingFee}
        setIsThereBookingFee={setIsThereBookingFee}
        split={split}
        setSplit={setSplit}
      />
      <ExpenseList expenses={expenses} setExpenses={setExpenses} />
      {FLAGS.NOTES && <NotesInput note={note} setNote={setNote} />}
      <Earnings expenses={expenses} netRoyalties={netRoyalties} split={split} />
    </form>
  );
}
