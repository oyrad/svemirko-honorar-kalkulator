import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { Expense } from '@/types/types';
import { formatReportFormData } from '@/utils/format-report-form-data';
import { ReportFormData } from '@/app/report/create/page';

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
  return useMutation({
    mutationFn: (data) => editReport(id, data),
    ...options,
  });
}
