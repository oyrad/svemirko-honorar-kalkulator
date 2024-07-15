import Link from 'next/link';
import ArrowLeft from '@/app/_icons/ArrowLeft';
import Button from '@/app/_atoms/Button';
import { MoonLoader } from 'react-spinners';
import BasicInfo from '@/app/report/create/_components/BasicInfo';
import Settings from '@/app/report/create/_components/Settings';
import ExpenseList from '@/app/report/create/_components/ExpenseList';
import { FLAGS } from '@/libs/flags';
import NotesInput from '@/app/report/create/_components/NoteInput';
import Earnings from '@/app/report/create/_components/Earnings';
import { Expense, Split } from '@/types/types';
import { FormEvent, useMemo } from 'react';
import { getNetRoyalties } from '@/utils/utils';

interface ReportFormProps {
  name: string;
  setName: (name: string) => void;
  grossRoyalties: string;
  setGrossRoyalties: (grossRoyalties: string) => void;
  isThereBookingFee: boolean;
  setIsThereBookingFee: (isThereBookingFee: boolean) => void;
  split: Split;
  setSplit: (split: Split) => void;
  expenses: Expense[];
  setExpenses: (
    value: Expense[] | ((prevState: Expense[]) => Expense[]),
  ) => void;
  note: string;
  setNote: (note: string) => void;
  isLoading: boolean;
  backLink: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function ReportForm({
  name,
  setName,
  grossRoyalties,
  setGrossRoyalties,
  isThereBookingFee,
  setIsThereBookingFee,
  split,
  setSplit,
  expenses,
  setExpenses,
  note,
  setNote,
  isLoading,
  backLink,
  handleSubmit,
}: ReportFormProps) {
  const netRoyalties = useMemo(
    () => getNetRoyalties(grossRoyalties, isThereBookingFee, expenses),
    [expenses, grossRoyalties, isThereBookingFee],
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Link href={backLink}>
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
