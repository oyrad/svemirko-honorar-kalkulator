import Link from 'next/link';
import Button from '@/app/_atoms/Button';
import { MoonLoader } from 'react-spinners';
import BasicInfo from '@/app/report/create/_components/BasicInfo';
import Settings from '@/app/report/create/_components/Settings';
import ExpenseList from '@/app/report/create/_components/ExpenseList';
import { FLAGS } from '@/libs/flags';
import NotesInput from '@/app/report/create/_components/NoteInput';
import Earnings from '@/app/report/create/_components/Earnings';
import { Expense, ReportTextData, SelectedGig, Split } from '@/types/types';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useSearchParams } from 'next/navigation';
import Loader from '@/app/_atoms/Loader';
import NotFound from '@/app/_components/NotFound';
import { useQuery } from 'react-query';

interface ReportFormProps {
  report: ReportTextData;
  setReport: (
    report: (prev: ReportTextData) => {
      isThereBookingFee: boolean;
      note: string;
      grossRoyalties: string;
      split: Split;
      isLocked: boolean;
      name: string;
    },
  ) => void;
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
  selectedGigs: SelectedGig[];
  setSelectedGigs: (selectedGigs: SelectedGig[]) => void;
  isLoading: boolean;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  backLink: string;
}

export default function ReportForm({
  report,
  setReport,
  expenses,
  setExpenses,
  selectedGigs,
  setSelectedGigs,
  isLoading,
  handleSubmit,
  backLink,
}: ReportFormProps) {
  const gigId = useSearchParams().get('gigId');

  const {
    data: gig,
    isLoading: isGigInfoLoading,
    error,
  } = useQuery(
    `gig-${gigId}`,
    async () => {
      const res = await fetch(`/api/gigs/${gigId}`);
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error('Gig not found');
      }
    },
    {
      enabled: !!gigId,
    },
  );

  useEffect(() => {
    if (!gigId || !gig) return;

    setSelectedGigs([
      {
        value: gigId,
        label: `${gig.city} - ${gig.venue}`,
      },
    ]);
    setReport((prevReport) => ({
      ...prevReport,
      grossRoyalties:
        gig.royalties !== 'door deal' ? gig.royalties.split('€')[0] : '',
      name: gig.city,
    }));
  }, [gig, gigId, setReport, setSelectedGigs]);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value, type } = e.target;
    const newValue =
      type === 'checkbox' && 'checked' in e.target
        ? (e.target as HTMLInputElement).checked
        : value;
    setReport((prev: ReportTextData) => ({ ...prev, [name]: newValue }));
  }

  if (isGigInfoLoading) {
    return <Loader />;
  }

  if (error) {
    return <NotFound backLink="/" text="Svirka ne postoji." />;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Link href={backLink}>
          <Button className="border border-gray-500 bg-white dark:bg-gray-800 px-2 py-1.5 hover:opacity-75">
            <ArrowLeftIcon className="size-5 text-gray-700 dark:text-gray-100" />
          </Button>
        </Link>
        <Button
          type="submit"
          className="font-medium dark:bg-gradient-to-r bg-white border border-green-600 text-green-600 dark:text-black dark:from-green-400 dark:to-green-500 w-24 h-8 justify-center hover:opacity-85"
        >
          {isLoading ? <MoonLoader size={16} /> : 'Spremi'}
        </Button>
      </div>
      <BasicInfo
        report={report}
        handleChange={handleChange}
        selectedGigs={selectedGigs}
        setSelectedGigs={setSelectedGigs}
      />
      <Settings report={report} handleChange={handleChange} />
      <ExpenseList expenses={expenses} setExpenses={setExpenses} />
      {FLAGS.NOTES && (
        <NotesInput note={report.note} handleChange={handleChange} />
      )}
      <Earnings report={report} expenses={expenses} />
    </form>
  );
}
