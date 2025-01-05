import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

function lockReport(id: string) {
  return fetch(`/api/reports/${id}/lock`, {
    method: 'PUT',
  });
}

export function useLockReportMutation(
  id: string,
  options?: UseMutationOptions,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => lockReport(id),
    onSuccess: (...args) => {
      options?.onSuccess?.(...args);

      void queryClient.invalidateQueries({ queryKey: ['reports', id] });
    },
    ...options,
  });
}
