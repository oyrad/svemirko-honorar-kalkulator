import { MoonLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { useGigByIdQuery } from '@/hooks/use-gig-by-id-query';
import { Expenses } from '@/app/report/create/_components/Expenses';
import { Expense } from '@/types/types';
import { useFormContext } from 'react-hook-form';
import { ReportFormData } from '@/app/report/create/page';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Earnings } from '@/app/report/create/_components/Earnings';
import { BasicInfo } from '@/app/report/create/_components/BasicInfo';
import { Settings } from '@/app/report/create/_components/Settings';
import { Button } from '@/app/_atoms/Button';
import { Loader } from '@/app/_atoms/Loader';
import { NotFound } from '@/app/_components/NotFound';
import { BackButton } from '@/app/_components/BackButton';

interface ReportFormProps {
  expenses: Array<Expense>;
  setExpenses: Dispatch<SetStateAction<Array<Expense>>>;
  isSubmitLoading: boolean;
  backLink: string;
}

export function ReportForm({ expenses, setExpenses, isSubmitLoading, backLink }: ReportFormProps) {
  const gigId = useSearchParams().get('gigId');

  const { data: gig, isLoading: isGigInfoLoading, error } = useGigByIdQuery(gigId ?? '');

  const { setValue } = useFormContext<ReportFormData>();

  useEffect(() => {
    if (!gigId || !gig) return;

    setValue('gigIds', [gigId]);
    setValue('name', gig.city);
    setValue('grossRoyalties', gig.royalties !== 'door deal' ? gig.royalties.split('€')[0] : '');
  }, [gig, gigId, setValue]);

  if (isGigInfoLoading) {
    return <Loader />;
  }

  if (error) {
    return <NotFound backLink="/" text="Svirka ne postoji." />;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <BackButton link={backLink} />
        <Button
          type="submit"
          className="font-medium dark:bg-gradient-to-r bg-white border border-green-600 text-green-600 dark:text-black dark:from-green-400 dark:to-green-500 w-24 h-8 justify-center hover:opacity-85"
        >
          {isSubmitLoading ? <MoonLoader size={16} /> : 'Spremi'}
        </Button>
      </div>
      <BasicInfo />
      <Settings />
      <Expenses expenses={expenses} setExpenses={setExpenses} />
      <Earnings expenses={expenses} />
    </>
  );
}
