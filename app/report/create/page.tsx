'use client';

import BasicInfo from '@/app/_components/BasicInfo';
import Settings from '@/app/_components/Settings';
import ExpenseList from '@/app/_components/ExpenseList';
import Earnings from '@/app/_components/Earnings';
import { useRouter } from 'next/navigation';
import Button from '@/app/_atoms/Button';
import ArrowLeft from '@/app/_icons/ArrowLeft';
import { useRoyaltiesStore } from '@/stores/royaltiesStore';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import useClearForm from '@/hooks/useClearForm';
import NotesInput from '@/app/_components/NoteInput';

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
        <ArrowLeft onClick={() => router.push('/')} />
        <Button
          onClick={() => {}}
          type="submit"
          className="font-semibold rounded-lg bg-green-300 hover:bg-green-400 dark:bg-green-500 w-24 flex justify-center items-center"
        >
          {isLoading ? <ClipLoader size={24} /> : 'Spremi'}
        </Button>
      </div>
      <BasicInfo />
      <Settings />
      <ExpenseList />
      <NotesInput note={note} setNote={setNote} />
      <Earnings />
    </form>
  );
}
