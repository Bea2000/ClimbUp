import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { getAdminsByOrganizer } from '@/lib/db/admin';

import AdminList from './components/AdminList';

export default async function ManageAdminsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  const admins = await getAdminsByOrganizer(session.user.organizerId, parseInt(session.user.id));

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestionar Administradores</h1>
        <Link 
          href="/dashboard/admin/manage/create" 
          className="btn btn-primary"
        >
          <span className="mr-2">+</span>
          Crear Nuevo Administrador
        </Link>
      </div>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <AdminList admins={admins} />
        </div>
      </div>
    </div>
  );
} 
