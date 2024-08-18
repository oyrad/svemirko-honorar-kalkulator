'use client';

import Input from '@/app/_atoms/Input';
import { useState } from 'react';
import Button from '@/app/_atoms/Button';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    console.log('submit');
    router.push('/');
    return;
  }

  console.log({ user, password }, !user, !password);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1.5 mb-4">
        <label>User</label>
        <Input
          name="username"
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1.5 mb-6">
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
        className="bg-blue-600 w-full text-center text-white"
        disabled={!user || !password}
      >
        Log in
      </Button>
    </form>
  );
}
