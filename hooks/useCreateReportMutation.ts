import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { formatReportFormData } from '@/libs/utils';
import { Report } from '@/types/types';

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
