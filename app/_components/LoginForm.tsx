'use client';

import Input from '@/app/_atoms/Input';
import { FormEvent, useState } from 'react';
import Button from '@/app/_atoms/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import { MoonLoader } from 'react-spinners';
import Card from '@/app/_atoms/Card';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const redirectTo = useSearchParams().get('redirectTo');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('Podaci nisu ispravni.');
        }
      })
      .then((data) => {
        localStorage.setItem('user', JSON.stringify(data));
        router.push(redirectTo ?? '/');
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Card className="bg-red-50 border border-red-700 dark:bg-red-700 mb-8">
          {error}
        </Card>
      )}
      <div className="flex flex-col gap-1.5 mb-4">
        <label>User</label>
        <Input
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1.5 mb-8">
        <label>Password</label>
        <Input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        type="submit"
        className="bg-blue-600 w-full flex justify-center text-white py-2"
        disabled={!username || !password}
      >
        {isLoading ? <MoonLoader size={18} color="white" /> : 'Log in'}
      </Button>
    </form>
  );
}
