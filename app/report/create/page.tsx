'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { Expense, SelectedGig, Split } from '@/types/types';
import { FormProvider, useForm } from 'react-hook-form';
import { useCreateReportMutation } from '@/hooks/use-create-report-mutation';
import { ReportForm } from '@/app/_components/ReportForm';
import { Loader } from '@/app/_atoms/Loader';

export interface ReportFormData {
  name: string;
  grossRoyalties: string;
  isThereBookingFee: boolean;
  split: Split;
  selectedGigs: Array<SelectedGig>;
  isLocked: boolean;
}

const REPORT_FORM_DEFAULTS: ReportFormData = {
  name: '',
  grossRoyalties: '',
  isThereBookingFee: false,
  split: 'deal',
  selectedGigs: [],
  isLocked: false,
};

export default function CreateReport() {
  const [expenses, setExpenses] = useState<Array<Expense>>([]);

  const { push } = useRouter();
  const from = useSearchParams().get('from');

  const methods = useForm<ReportFormData>({
    defaultValues: REPORT_FORM_DEFAULTS,
  });

  const { mutate: createReport, isPending } = useCreateReportMutation({
    onSuccess: () => {
      push('/');
      methods.reset();
      setExpenses([]);
    },
  });

  return (
    <Suspense fallback={<Loader />}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            createReport({ ...data, expenses }),
          )}
          className="flex flex-col gap-4"
        >
          <ReportForm
            expenses={expenses}
            setExpenses={setExpenses}
            isSubmitLoading={isPending}
            backLink={from === 'gigs' ? '/gigs' : '/'}
          />
        </form>
      </FormProvider>
    </Suspense>
  );
}
