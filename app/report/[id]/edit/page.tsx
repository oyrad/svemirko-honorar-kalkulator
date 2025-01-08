'use client';

import { useParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Expense } from '@/types/types';
import { FormProvider, useForm } from 'react-hook-form';
import { ReportFormData } from '@/app/report/create/page';
import { useReportByIdQuery } from '@/hooks/use-report-by-id-query';
import { useEditReportMutation } from '@/hooks/use-edit-report-mutation';
import { ReportForm } from '@/ui/components/ReportForm';
import { NotFound } from '@/ui/components/NotFound';
import { Loader } from '@/ui/atoms/Loader';

export default function EditReport() {
  const [expenses, setExpenses] = useState<Array<Expense>>([]);

  const { push } = useRouter();
  const { id } = useParams();
  const singleId = Array.isArray(id) ? id[0] : id;

  const { data: report, isPending: isReportLoading, isError } = useReportByIdQuery(singleId);

  const methods = useForm<ReportFormData>({
    values: report,
  });

  const { mutate: editReport, isPending: isSubmitLoading } = useEditReportMutation(singleId, {
    onSuccess: () => {
      push(`/report/${id}`);
      methods.reset();
      setExpenses([]);
    },
  });

  useEffect(() => {
    setExpenses(report?.expenses ?? []);
  }, [report?.expenses]);

  if (isReportLoading) return <Loader />;

  if (isError) return <NotFound backLink="/" text="Izračun ne postoji." />;

  return (
    <Suspense fallback={<Loader />}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => editReport({ ...data, expenses }))}
          className="flex flex-col gap-4"
        >
          <ReportForm
            expenses={expenses}
            setExpenses={setExpenses}
            isSubmitLoading={isSubmitLoading}
            backLink={`/report/${id}`}
          />
        </form>
      </FormProvider>
    </Suspense>
  );
}
