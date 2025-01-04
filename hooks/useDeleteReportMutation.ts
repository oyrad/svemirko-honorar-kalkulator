import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

function deleteReport(id: string) {
  return fetch(`/api/reports/${id}`, {
    method: 'DELETE',
  });
}

export function useDeleteReportMutation(
  id: string,
  options?: UseMutationOptions,
) {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  return useMutation({
    mutationFn: () => deleteReport(id),
    onSuccess: () => {
      options?.onSuccess?.();

      void queryClient.invalidateQueries({ queryKey: ['reports'] });
      push('/');
    },
    ...options,
  });
}
