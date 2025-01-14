'use client';

import { AuthContextProvider } from '@/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

export function Providers({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();
  return (
    <NuqsAdapter>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </AuthContextProvider>
    </NuqsAdapter>
  );
}
