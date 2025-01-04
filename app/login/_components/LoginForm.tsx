'use client';

import Input from '@/app/_atoms/Input';
import Button from '@/app/_atoms/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import { MoonLoader } from 'react-spinners';
import Card from '@/app/_atoms/Card';
import { useLogin } from '@/hooks/useLoginMutation';
import { useForm } from 'react-hook-form';

export interface LoginFormValues {
  username: string;
  password: string;
}

const loginFormDefaultValues = {
  username: '',
  password: '',
};

export default function LoginForm() {
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

  const { register, handleSubmit, getValues } = useForm<LoginFormValues>({
    defaultValues: loginFormDefaultValues,
  });

  const onSubmit = handleSubmit((data) => login(data));

  return (
    <form onSubmit={onSubmit}>
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
        disabled={!getValues().username || !getValues().password}
      >
        {isLoading ? <MoonLoader size={18} color="white" /> : 'Log in'}
      </Button>
    </form>
  );
}
