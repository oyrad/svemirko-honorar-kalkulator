import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { formatReportFormData } from '@/utils/format-report-form-data';
import { ReportFormData } from '@/app/report/create/page';
import { Expense } from '@/types/types';
import { queryKeys } from '@/utils/query-keys';

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReport,
    ...options,
    onSuccess: async (...args) => {
      options?.onSuccess?.(...args);

      await queryClient.invalidateQueries({ queryKey: queryKeys.reports });
      await queryClient.invalidateQueries({ queryKey: queryKeys.gigs });
    },
  });
}
