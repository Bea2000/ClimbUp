'use client';

import { Admin } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-hot-toast';

import { deleteAdmin } from '@/app/actions/admin';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

interface AdminListProps {
  admins: Admin[];
}

export default function AdminList({ admins }: AdminListProps) {
  const router = useRouter();
  const [selectedAdminId, setSelectedAdminId] = React.useState<number | null>(null);

  async function deleteAdminConfirmed(adminId: number) {
    const result = await deleteAdmin(adminId);
    if (result.status === 'success') {
      toast.success('Administrador eliminado correctamente');
      router.refresh();
    } else {
      toast.error(result.error?.message || 'Error al eliminar el administrador');
    }
  }

  function handleDelete(adminId: number) {
    setSelectedAdminId(adminId);
    (document.getElementById('delete_admin_modal') as HTMLDialogElement)?.showModal();
  }

  function handleConfirmDelete() {
    if (selectedAdminId !== null) {
      deleteAdminConfirmed(selectedAdminId);
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr className="bg-base-200">
            <th>Email</th>
            <th>RUT</th>
            <th>Tipo</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {admins.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-4 text-center">
                No hay administradores registrados
              </td>
            </tr>
          ) : (
            admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.email}</td>
                <td>{admin.rut}</td>
                <td>
                  <span className={`badge ${admin.isSuperAdmin ? 'badge-primary' : 'badge-secondary'}`}>
                    {admin.isSuperAdmin ? 'Super Admin' : 'Admin'}
                  </span>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => handleDelete(admin.id)}
                    className="btn btn-circle btn-error btn-sm"
                    title="Eliminar administrador"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <ConfirmDialog
        id="delete_admin_modal"
        title="Confirmar eliminación"
        message="¿Estás seguro de que deseas eliminar este administrador?"
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
} 
