'use client';

import BasicInfo from '@/app/report/create/_components/BasicInfo';
import Settings from '@/app/report/create/_components/Settings';
import ExpenseList from '@/app/report/create/_components/ExpenseList';
import Earnings from '@/app/report/create/_components/Earnings';
import { useRouter } from 'next/navigation';
import Button from '@/app/_atoms/Button';
import ArrowLeft from '@/app/_icons/ArrowLeft';
import { useRoyaltiesStore } from '@/stores/royaltiesStore';
import { useState } from 'react';
import { MoonLoader } from 'react-spinners';
import useClearForm from '@/hooks/useClearForm';
import NotesInput from '@/app/report/create/_components/NoteInput';
import Link from 'next/link';
import { FLAGS } from '@/libs/flags';

export default function Create() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [note, setNote] = useState('');

  const {
    name,
    grossRoyalties,
    expenses,
    isThereBookingFee,
    split,
    netBandPay,
  } = useRoyaltiesStore();

  const clearForm = useClearForm();

  function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/reports`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        grossRoyalties,
        expenses,
        isThereBookingFee,
        split,
        note,
        netBandPay,
      }),
    })
      .then((res) => {
        if (res.status === 201) {
          router.push('/');
          clearForm();
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Link href="/">
          <ArrowLeft />
        </Link>
        <Button
          type="submit"
          className="font-medium rounded-lg bg-gradient-to-r from-green-400 to-green-500 w-24 h-8 flex justify-center items-center hover:opacity-85"
        >
          {isLoading ? <MoonLoader size={16} /> : 'Spremi'}
        </Button>
      </div>
      <BasicInfo />
      <Settings />
      <ExpenseList />
      {FLAGS.NOTES && <NotesInput note={note} setNote={setNote} />}
      <Earnings />
    </form>
  );
}
