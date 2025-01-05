import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { LoginFormValues } from '@/app/login/_components/LoginForm';

async function handleLogin({ username, password }: LoginFormValues) {
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

export function useLogin(
  options?: UseMutationOptions<Response, Error, LoginFormValues>,
) {
  return useMutation({
    mutationFn: handleLogin,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);

      localStorage.setItem('user', JSON.stringify(data));
    },
  });
}
