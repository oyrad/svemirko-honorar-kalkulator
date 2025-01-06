import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { formatReportFormData } from '@/utils/format-report-form-data';
import { ReportFormData } from '@/app/report/create/page';
import { Expense } from '@/types/types';

interface CreateReportData extends ReportFormData {
  expenses: Array<Expense>;
}

function createReport(data: CreateReportData) {
  return fetch('/api/reports', {
    method: 'POST',
    body: JSON.stringify(formatReportFormData(data)),
  });
}

export function useCreateReportMutation(
  options?: Omit<UseMutationOptions<Response, Error, CreateReportData>, 'mutationFn'>,
) {
  return useMutation({
    mutationFn: createReport,
    ...options,
  });
}
