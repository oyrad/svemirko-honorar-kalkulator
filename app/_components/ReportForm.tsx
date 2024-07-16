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
import { Expense, ReportTextData, Split } from '@/types/types';
import { ChangeEvent, FormEvent } from 'react';

interface ReportFormProps {
  report: ReportTextData;
  setReport: (
    report: (prev: ReportTextData) => {
      isThereBookingFee: boolean;
      note: string;
      grossRoyalties: string;
      split: Split;
      name: string;
    },
  ) => void;
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
  isLoading: boolean;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  backLink: string;
}

export default function ReportForm({
  report,
  setReport,
  expenses,
  setExpenses,
  isLoading,
  handleSubmit,
  backLink,
}: ReportFormProps) {
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setReport((prev: ReportTextData) => ({ ...prev, [name]: newValue }));
  }

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
      <BasicInfo report={report} handleChange={handleChange} />
      <Settings report={report} handleChange={handleChange} />
      <ExpenseList expenses={expenses} setExpenses={setExpenses} />
      {FLAGS.NOTES && (
        <NotesInput note={report.note} handleChange={handleChange} />
      )}
      <Earnings report={report} expenses={expenses} />
    </form>
  );
}
