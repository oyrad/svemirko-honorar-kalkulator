import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { LoginFormValues } from '@/app/login/_components/LoginForm';

function handleLogin({ username, password }: LoginFormValues) {
  return fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error('Podaci nisu ispravni.');
    }
  });
}

export function useLogin(options?: UseMutationOptions) {
  return useMutation({
    mutationFn: handleLogin,
    onSuccess: (data) => {
      options?.onSuccess?.();

      localStorage.setItem('user', JSON.stringify(data));
    },
  });
}
