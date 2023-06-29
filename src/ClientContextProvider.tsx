'use client';

import { createContext, ReactNode } from 'react';
import { Client } from './client';

interface ClientContextProviderProps {
  apiUrl: string;
  defaultRequestInit?: RequestInit;
  defaultSite?: string;
  children: ReactNode;
}

const ClientContext = createContext(null);

export function ClientContextProvider({
  apiUrl,
  defaultRequestInit,
  defaultSite,
  children,
}: ClientContextProviderProps) {
  if (!apiUrl) {
    throw new Error('apiUrl is required for ClientContextProvider');
  }

  return (
    <ClientContext.Provider
      value={new Client(apiUrl, defaultRequestInit, defaultSite)}
    >
      {children}
    </ClientContext.Provider>
  );
}

export { ClientContext };
