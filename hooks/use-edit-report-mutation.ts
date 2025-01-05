import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { Report } from '@/types/types';
import { formatReportFormData } from '@/utils/format-report-form-data';

function editReport(id: string, data: Report) {
  return fetch(`/api/reports/${id}`, {
    method: 'PUT',
    body: JSON.stringify(formatReportFormData(data)),
  });
}

export function useEditReportMutation(
  id: string,
  options?: UseMutationOptions<Response, Error, Report>,
) {
  return useMutation({
    mutationFn: (data) => editReport(id, data),
    ...options,
  });
}
