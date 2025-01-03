'use client';

import { useRouter } from 'next/navigation';
import { Toast, toast } from 'react-hot-toast';

import { deleteAdmin } from '@/app/actions/admin';
import { AdminWithUser } from '@/types/admin';

interface AdminListProps {
  admins: AdminWithUser[];
}

export default function AdminList({ admins }: AdminListProps) {
  const router = useRouter();

  async function deleteAdminConfirmed(adminId: number) {
    const result = await deleteAdmin(adminId);
    if (result.status === 'success') {
      toast.success('Administrador eliminado correctamente');
      router.refresh();
    } else {
      toast.error(result.error?.message || 'Error al eliminar el administrador');
    }
  }

  async function handleDelete(adminId: number) {
    toast((t: Toast) => (
      <div>
        <p>¿Estás seguro de que deseas eliminar este administrador?</p>
        <div className="mt-2">
          <button className="btn btn-error btn-sm mr-2" onClick={() => {
            toast.dismiss(t.id);
            deleteAdminConfirmed(adminId);
          }}>Eliminar</button>
          <button className="btn btn-sm" onClick={() => toast.dismiss(t.id)}>Cancelar</button>
        </div>
      </div>
    ), { duration: Infinity });
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr className="bg-base-200">
            <th>Nombre</th>
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
                <td>{admin.user.name}</td>
                <td>{admin.user.email}</td>
                <td>{admin.user.rut}</td>
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
    </div>
  );
} 
