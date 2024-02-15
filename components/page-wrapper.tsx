"use client"
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <>
    <SessionProvider>
      <div className="flex flex-col pt-2 px-4 space-y-2 bg-zinc-100 flex-grow pb-4">
        {children}
      </div>
      </SessionProvider>
    </>
  );
}
