'use client';

import BasicInfo from '@/app/_components/BasicInfo';
import Settings from '@/app/_components/Settings';
import ExpenseList from '@/app/_components/ExpenseList';
import DebtList from '@/app/_components/DebtList';
import Earnings from '@/app/_components/Earnings';
import { useRouter } from 'next/navigation';
import Button from '@/app/_atoms/Button';
import ArrowLeft from '@/app/_icons/ArrowLeft';

export default function Create() {
  const router = useRouter();

  return (
    <>
      <div className="flex justify-between items-center">
        <ArrowLeft onClick={() => router.push('/')} />
        <Button
          onClick={() => {}}
          className="font-semibold rounded-lg px-5 bg-green-300 hover:bg-green-400"
        >
          Spremi
        </Button>
      </div>
      <BasicInfo />
      <Settings />
      <ExpenseList />
      <DebtList />
      <Earnings />
    </>
  );
}
