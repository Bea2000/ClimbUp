'use client';

import { SessionProvider } from 'next-auth/react';
import React, { FC } from 'react';

interface ProviderProps {
  children: React.ReactNode;
}

// eslint-disable-next-line func-style
const Provider: FC<ProviderProps> = ({ children }) => <SessionProvider>{children}</SessionProvider>;

export default Provider;
