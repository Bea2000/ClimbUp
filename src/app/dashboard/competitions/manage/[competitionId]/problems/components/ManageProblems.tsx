'use client';

import { Sector } from "@prisma/client";
import { useRouter } from 'next/navigation';
import React, { useState, useActionState } from 'react';
import { toast } from 'react-hot-toast';

import { deleteProblem } from '@/app/actions/problem';
import { assignSectorToProblem, removeSectorFromProblem } from '@/app/actions/sector';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { ProblemWithSector } from "@/types/problem";

import AssignSectorDialog from './AssignSectorDialog';
import ProblemsTable from './ProblemsTable';

interface ManageProblemsProps {
  problems: ProblemWithSector[];
  competitionId: number;
  sectors: Sector[];
}

export default function ManageProblems({ problems, competitionId, sectors }: ManageProblemsProps) {
  const router = useRouter();
  const [selectedProblemId, setSelectedProblemId] = useState<number | null>(null);
  const [isAssignSectorDialogOpen, setIsAssignSectorDialogOpen] = useState(false);
  const [problemToAssignSector, setProblemToAssignSector] = useState<ProblemWithSector | null>(null);

  const [lastResult, formAction] = useActionState(deleteProblem, undefined);

  React.useEffect(() => {
    if (lastResult?.status === 'success') {
      toast.success('Problema eliminado correctamente');
      setSelectedProblemId(null);
      const modal = document.getElementById('delete_problem_modal') as HTMLDialogElement;
      modal?.close();
      router.refresh();
    } else if (lastResult?.status === 'error') {
      toast.error(lastResult.error?.message?.[0] || 'Error al eliminar problema');
    }
  }, [lastResult, router]);

  function handleSkip() {
    router.push(`/dashboard/competitions`);
  }

  function goToAddProblemForm() {
    router.push(`/dashboard/competitions/manage/${competitionId}/problems/add`);
  }

  function handleFinalize() {
    router.push(`/dashboard/competitions/${competitionId}`);
  }

  function handleBack() {
    router.push(`/dashboard/competitions/${competitionId}`);
  }

  function handleDeleteClick(problemId: number) {
    setSelectedProblemId(problemId);
    const modal = document.getElementById('delete_problem_modal') as HTMLDialogElement;
    modal?.showModal();
  }

  function handleAssignSectorClick(problemId: number) {
    const problem = problems.find(p => p.id === problemId);
    if (problem) {
      setProblemToAssignSector(problem);
      setIsAssignSectorDialogOpen(true);
    }
  }

  async function handleRemoveSector(problemId: number) {
    try {
      const result = await removeSectorFromProblem(problemId);
      if (result.success) {
        toast.success('Sector removido correctamente');
        router.refresh();
      }
    } catch {
      toast.error('Error al remover sector');
    }
  }

  async function handleSectorAssign(sectorId: number) {
    if (!problemToAssignSector) return;
    
    try {
      const result = await assignSectorToProblem(problemToAssignSector.id, sectorId);
      if (result.success) {
        toast.success('Sector asignado correctamente');
        setIsAssignSectorDialogOpen(false);
        setProblemToAssignSector(null);
        router.refresh();
      }
    } catch {
      toast.error('Error al asignar sector');
    }
  }

  function handleConfirmDelete(e: React.FormEvent) {
    e.preventDefault();
    if (selectedProblemId) {
      const formData = new FormData();
      formData.append('competitionId', competitionId.toString());
      formData.append('problemId', selectedProblemId.toString());
      
      React.startTransition(() => {
        formAction(formData);
      });
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-6 text-2xl">Gestionar Problemas</h2>
          
          <div className="flex gap-2 flex-wrap mb-6">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={goToAddProblemForm}
            >
              Agregar Problema
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => router.push(`/dashboard/competitions/manage/${competitionId}/sectors`)}
            >
              Gestionar Sectores
            </button>
          </div>
          
          <div className="space-y-4">
            <ProblemsTable 
              problems={problems} 
              handleDeleteClick={handleDeleteClick}
              handleRemoveSector={handleRemoveSector}
              handleAssignSectorClick={handleAssignSectorClick}
              sectors={sectors}
            />
          </div>

          <div className="mt-6 flex flex-col gap-4">

            <div className="flex justify-between">
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleBack}
              >
                Volver
              </button>
              {problems.length === 0 ? (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleSkip}
                >
                  Gestionar Después
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleFinalize}
                >
                  Continuar
                </button>
              )}
            </div>
              
          </div>
        </div>
      </div>

      <ConfirmDialog
        id="delete_problem_modal"
        title="Confirmar Eliminación"
        message="¿Estás seguro de que deseas eliminar este problema?"
        onConfirm={handleConfirmDelete}
      />

      {/* Assign Sector Dialog */}
      {problemToAssignSector && (
        <AssignSectorDialog
          isOpen={isAssignSectorDialogOpen}
          onClose={() => {
            setIsAssignSectorDialogOpen(false);
            setProblemToAssignSector(null);
          }}
          onAssign={handleSectorAssign}
          sectors={sectors}
          problemName={problemToAssignSector.name || "Sin nombre"}
        />
      )}
    </div>
  );
} 
