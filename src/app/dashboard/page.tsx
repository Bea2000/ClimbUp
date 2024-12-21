'use client';

import { redirect } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

export default function DashboardPage() {
  const { status } = useSession();

  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  if (status === "unauthenticated") {
    redirect('/login');
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => signOut()}>Cerrar sesión</button>
    </div>
  );
} 
