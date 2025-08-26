'use client';

import { Sector } from "@prisma/client";
import { useRouter } from 'next/navigation';
import React, { useState, useActionState } from 'react';
import { toast } from 'react-hot-toast';

import { deleteSectorAction } from '@/app/actions/sector';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

import SectorsTable from './SectorsTable';

interface ManageSectorsProps {
  sectors: Sector[];
  competitionId: number;
}

export default function ManageSectors({ sectors, competitionId }: ManageSectorsProps) {
  const router = useRouter();
  const [sectorToDelete, setSectorToDelete] = useState<Sector | null>(null);

  const [lastResult, formAction] = useActionState(deleteSectorAction, undefined);

  React.useEffect(() => {
    if (lastResult?.status === 'success') {
      toast.success('Sector eliminado correctamente');
      setSectorToDelete(null);
      const modal = document.getElementById('delete_sector_modal') as HTMLDialogElement;
      modal?.close();
      router.refresh();
    } else if (lastResult?.status === 'error') {
      toast.error(lastResult.error?.message?.[0] || 'Error al eliminar sector');
    }
  }, [lastResult, router]);

  function handleBack() {
    router.push(`/dashboard/competitions/manage/${competitionId}/problems`);
  }

  function goToAddSectorForm() {
    router.push(`/dashboard/competitions/manage/${competitionId}/sectors/add`);
  }

  function handleDeleteClick(sectorId: number) {
    const sector = sectors.find(s => s.id === sectorId);
    if (sector) {
      setSectorToDelete(sector);
      const modal = document.getElementById('delete_sector_modal') as HTMLDialogElement;
      modal?.showModal();
    }
  }


  function handleConfirmDelete(e: React.FormEvent) {
    e.preventDefault();
    if (sectorToDelete) {
      const formData = new FormData();
      formData.append('competitionId', competitionId.toString());
      formData.append('sectorId', sectorToDelete.id.toString());
      
      React.startTransition(() => {
        formAction(formData);
      });
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-6 text-2xl">Gestionar Sectores</h2>
          
          <div className="flex gap-2 flex-wrap mb-6">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={goToAddSectorForm}
            >
              Crear Sector
            </button>
          </div>

          
          <div className="space-y-4">
            {sectors.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                <p className="text-gray-500">
                  No hay sectores creados. Crea el primer sector para comenzar.
                </p>
              </div>
            ) : (
              <SectorsTable 
                sectors={sectors}
                handleDeleteClick={handleDeleteClick}
              />
            )}
          </div>

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleBack}
            >
              Volver
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        id="delete_sector_modal"
        title="Confirmar Eliminación"
        message={`¿Estás seguro de que deseas eliminar el sector "${sectorToDelete?.name}"? Esto también desasignará todos los problemas de este sector.`}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
