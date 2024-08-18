'use client';

import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthContextProvider } from '@/context/AuthContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthContextProvider>
  );
}
