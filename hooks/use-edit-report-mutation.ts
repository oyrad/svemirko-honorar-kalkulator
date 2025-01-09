import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { Expense } from '@/types/types';
import { formatReportFormData } from '@/utils/format-report-form-data';
import { ReportFormData } from '@/app/report/create/page';
import { queryKeys } from '@/utils/query-keys';

interface EditReportData extends ReportFormData {
  expenses: Array<Expense>;
}

function editReport(id: string, data: EditReportData) {
  return fetch(`/api/reports/${id}`, {
    method: 'PUT',
    body: JSON.stringify(formatReportFormData(data)),
  });
}

export function useEditReportMutation(
  id: string,
  options?: Omit<UseMutationOptions<Response, Error, EditReportData>, 'mutationFn'>,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => editReport(id, data),
    ...options,
    onSuccess: async (...args) => {
      options?.onSuccess?.(...args);

      await queryClient.invalidateQueries({ queryKey: queryKeys.reports });
      await queryClient.invalidateQueries({ queryKey: queryKeys.gigs });
    },
  });
}
