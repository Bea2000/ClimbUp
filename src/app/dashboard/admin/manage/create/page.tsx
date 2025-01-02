import Link from 'next/link';

import CreateAdminForm from '../components/CreateAdminForm';

export default function CreateAdminPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Crear Nuevo Administrador</h1>
        <Link 
          href="/dashboard/admin/manage" 
          className="btn btn-outline"
        >
          Volver
        </Link>
      </div>
      <div className="mx-auto max-w-2xl">
        <CreateAdminForm />
      </div>
    </div>
  );
} 
