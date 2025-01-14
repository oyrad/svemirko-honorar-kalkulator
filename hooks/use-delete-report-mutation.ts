import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/utils/query-keys';

function deleteReport(id: string) {
  return fetch(`/api/reports/${id}`, {
    method: 'DELETE',
  });
}

export function useDeleteReportMutation(
  options?: Omit<UseMutationOptions<Response, Error, string>, 'mutationFn'>,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReport,
    ...options,
    onSuccess: async (...args) => {
      options?.onSuccess?.(...args);

      await queryClient.invalidateQueries({ queryKey: queryKeys.reports });
      await queryClient.invalidateQueries({ queryKey: queryKeys.gigs });
    },
  });
}
