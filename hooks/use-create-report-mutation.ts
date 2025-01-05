import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { Report } from '@/types/types';
import { formatReportFormData } from '@/utils/format-report-form-data';

function createReport(data: Report) {
  return fetch('/api/reports', {
    method: 'POST',
    body: JSON.stringify(formatReportFormData(data)),
  });
}

export function useCreateReportMutation(
  options?: UseMutationOptions<Response, Error, Report>,
) {
  return useMutation({
    mutationFn: createReport,
    ...options,
  });
}
