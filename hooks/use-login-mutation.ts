import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { LoginFormData } from '@/app/login/_components/LoginForm';

async function handleLogin({ username, password }: LoginFormData) {
  const res = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

  if (res.status === 200) {
    return res.json();
  } else {
    throw new Error('Podaci nisu ispravni.');
  }
}

export function useLoginMutation(
  options?: Omit<UseMutationOptions<Response, Error, LoginFormData>, 'mutationFn'>,
) {
  return useMutation({
    mutationFn: handleLogin,
    ...options,
    onSuccess: (...args) => {
      options?.onSuccess?.(...args);

      localStorage.setItem('user', JSON.stringify(args[0]));
    },
  });
}
