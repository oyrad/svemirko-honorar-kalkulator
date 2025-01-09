import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/utils/query-keys';

function lockReport(id: string) {
  return fetch(`/api/reports/${id}/lock`, {
    method: 'PUT',
  });
}

export function useLockReportMutation(id: string, options?: UseMutationOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => lockReport(id),
    ...options,
    onSuccess: async (...args) => {
      options?.onSuccess?.(...args);

      await queryClient.invalidateQueries({ queryKey: queryKeys.reports });
      await queryClient.invalidateQueries({ queryKey: queryKeys.gigs });
    },
  });
}
