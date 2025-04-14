'use client';

import { useRouter } from 'next/navigation';
import React, { useActionState, startTransition } from 'react';
import { toast } from 'react-hot-toast';

import { deleteJudge } from '@/app/actions/judge';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { JudgeWithUser } from '@/types/judge';

interface ManageJudgesFormProps {
  competitionId: number;
  judges: JudgeWithUser[];
}

export default function ManageJudges({ competitionId, judges }: ManageJudgesFormProps) {
  const router = useRouter();
  const [selectedJudgeId, setSelectedJudgeId] = React.useState<number | null>(null);

  const [lastResult, formAction] = useActionState(deleteJudge, undefined);

  React.useEffect(() => {
    if (lastResult?.status === 'success') {
      toast.success('Juez eliminado correctamente');
      (document.getElementById('delete_judge_modal') as HTMLDialogElement)?.close();
    } else if (lastResult?.status === 'error') {
      toast.error(lastResult.error?.message?.[0] || 'Error al eliminar juez');
    }
  }, [lastResult]);

  function handleSkipOrFinalize() {
    router.push(`/dashboard/competitions/manage/${competitionId}/problems`);
  }

  function goToAddJudgeForm() {
    router.push(`/dashboard/competitions/manage/${competitionId}/judges/add`);
  }

  function handleBack() {
    router.back();
  }

  function handleDeleteClick(judgeId: number) {
    setSelectedJudgeId(judgeId);
    (document.getElementById('delete_judge_modal') as HTMLDialogElement)?.showModal();
  }
  
  function handleConfirmDelete(e: React.FormEvent) {
    e.preventDefault();
    if (selectedJudgeId) {
      startTransition(() => {
        formAction(new FormData(e.target as HTMLFormElement));
      });
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-6 text-2xl">Gestionar Jueces</h2>
          
          <div className="space-y-4">
            {judges.map((judge) => (
              <div key={judge.id} className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <h3 className="font-semibold">{judge.user.name}</h3>
                  <p className="text-sm text-gray-600">{judge.user.email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteClick(judge.id)}
                  className="btn btn-error btn-sm"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={goToAddJudgeForm}
            >
              Agregar Juez
            </button>

            <div className="flex justify-between">
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleBack}
              >
                Volver
              </button>
              {judges.length === 0 ? (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleSkipOrFinalize}
                >
                  Gestionar Después
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSkipOrFinalize}
                >
                  Continuar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <>
        <input type="hidden" name="competitionId" value={competitionId} />
        <input type="hidden" name="judgeId" value={selectedJudgeId || ''} />
        <ConfirmDialog
          id="delete_judge_modal"
          title="Confirmar Eliminación"
          message="¿Estás seguro de que deseas eliminar este juez?"
          onConfirm={handleConfirmDelete}
        />
      </>
    </div>
  );
} 
