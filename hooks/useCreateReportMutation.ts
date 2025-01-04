import { useMutation } from '@tanstack/react-query';

function createReport() {
  return Promise.resolve();
}

export function useCreateReportMutation() {
  return useMutation({
    mutationFn: createReport,
  });
}
