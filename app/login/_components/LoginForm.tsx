'use client';

import Button from '@/app/_atoms/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import { MoonLoader } from 'react-spinners';
import Card from '@/app/_atoms/Card';
import { useLogin } from '@/hooks/useLoginMutation';
import { useForm } from 'react-hook-form';
import { Input } from '@/app/_atoms/Input';

export interface LoginFormValues {
  username: string;
  password: string;
}

export function LoginForm() {
  const redirectTo = useSearchParams().get('redirectTo');
  const { push } = useRouter();

  const {
    mutate: login,
    isPending: isLoading,
    error,
  } = useLogin({
    onSuccess: () => {
      push(redirectTo ?? '/');
    },
  });

  const { register, handleSubmit, watch } = useForm<LoginFormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { username, password } = watch();

  return (
    <form onSubmit={handleSubmit((data) => login(data))}>
      {error && (
        <Card className="bg-red-50 border border-red-700 dark:bg-red-700 mb-8">
          {error.message}
        </Card>
      )}
      <div className="flex flex-col gap-1.5 mb-4">
        <label>User</label>
        <Input {...register('username')} type="text" />
      </div>
      <div className="flex flex-col gap-1.5 mb-8">
        <label>Password</label>
        <Input {...register('password')} type="password" />
      </div>
      <Button
        type="submit"
        className="bg-blue-600 w-full flex justify-center text-white py-2"
        disabled={!username || !password}
      >
        {isLoading ? <MoonLoader size={18} color="white" /> : 'Prijava'}
      </Button>
    </form>
  );
}
