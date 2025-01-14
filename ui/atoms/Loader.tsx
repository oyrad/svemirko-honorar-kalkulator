'use client';

import { MoonLoader } from 'react-spinners';

export function Loader() {
  return (
    <div className="flex h-40 items-center justify-center">
      <MoonLoader size={60} color="#888" />
    </div>
  );
}
