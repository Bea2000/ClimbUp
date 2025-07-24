'use client';

import { Judge } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useActionState } from 'react';
import { toast } from 'react-hot-toast';

import { assignJudgeToProblem, assignJudgeToAllProblems } from '@/app/actions/judge';
import { deleteProblem } from '@/app/actions/problem';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { ProblemWithJudges } from '@/types/problem';

import AssignJudgeDialog from './AssignJudgeDialog';
import AssignJudgeToAllDialog from './AssignJudgeToAllDialog';
import ProblemsTable from './ProblemsTable';

interface ManageProblemsProps {
  competitionId: number;
  problems: ProblemWithJudges[];
  judges: Judge[];
}

export default function ManageProblems({ competitionId, problems, judges }: ManageProblemsProps) {
  const router = useRouter();
  const [selectedProblemId, setSelectedProblemId] = React.useState<number | null>(null);

  const [lastResult, formAction] = useActionState(deleteProblem, undefined);
  const [lastAssignResult, assignFormAction] = useActionState(assignJudgeToProblem, undefined);
  const [lastAssignAllResult, assignAllFormAction] = useActionState(assignJudgeToAllProblems, undefined);

  React.useEffect(() => {
    if (lastResult?.status === 'success') {
      toast.success('Problema eliminado correctamente');
      (document.getElementById('delete_problem_modal') as HTMLDialogElement)?.close();
    } else if (lastResult?.status === 'error') {
      toast.error(lastResult.error?.message?.[0] || 'Error al eliminar problema');
    }
  }, [lastResult]);

  React.useEffect(() => {
    if (lastAssignResult?.status === 'success') {
      if (lastAssignResult.action === 'assign') {
        toast.success('Juez asignado correctamente');
        (document.getElementById('assign_judge_modal') as HTMLDialogElement)?.close();
      } else if (lastAssignResult.action === 'remove') {
        toast.success('Juez eliminado correctamente');
      }
    } else if (lastAssignResult?.status === 'error') {
      toast.error(lastAssignResult.error?.message?.[0] || 'Error al asignar juez');
    }
  }, [lastAssignResult]);
  
  React.useEffect(() => {
    if (lastAssignAllResult?.status === 'success') {
      toast.success('Juez asignado a todos los problemas correctamente');
      (document.getElementById('assign_judge_to_all_modal') as HTMLDialogElement)?.close();
    } else if (lastAssignAllResult?.status === 'error') {
      toast.error(lastAssignAllResult.error?.message?.[0] || 'Error al asignar juez a todos los problemas');
    }
  }, [lastAssignAllResult]);

  function handleSkip() {
    router.push(`/dashboard/competitions`);
  }

  function goToAddProblemForm() {
    router.push(`/dashboard/competitions/manage/${competitionId}/problems/add`);
  }

  function handleFinalize() {
    router.push('/dashboard/competitions');
  }

  function handleBack() {
    router.push(`/dashboard/competitions/manage/${competitionId}/judges`);
  }

  function handleDeleteClick(problemId: number) {
    setSelectedProblemId(problemId);
    (document.getElementById('delete_problem_modal') as HTMLDialogElement)?.showModal();
  }

  function handleConfirmDelete(e: React.FormEvent) {
    e.preventDefault();
    if (selectedProblemId) {
      React.startTransition(() => {
        formAction(new FormData(e.target as HTMLFormElement));
      });
    }
  }

  function handleAssignJudgeClick(problemId: number) {
    setSelectedProblemId(problemId);
    (document.getElementById('assign_judge_modal') as HTMLDialogElement)?.showModal();
  }
  
  function handleAssignJudgeToAllClick() {
    (document.getElementById('assign_judge_to_all_modal') as HTMLDialogElement)?.showModal();
  }

  function handleConfirmAssign(e: React.FormEvent) {
    e.preventDefault();
    if (selectedProblemId) {
      React.startTransition(() => {
        assignFormAction(new FormData(e.target as HTMLFormElement));
      });
    }
  }
  
  function handleConfirmAssignAll(e: React.FormEvent) {
    e.preventDefault();
    React.startTransition(() => {
      assignAllFormAction(new FormData(e.target as HTMLFormElement));
    });
  }

  function handleRemoveJudge(problemId: number, judgeId: number) {
    React.startTransition(() => {
      const formData = new FormData();
      formData.append('problemId', problemId.toString());
      formData.append('judgeId', judgeId.toString());
      formData.append('action', 'remove');
      assignFormAction(formData);
    });
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
            {judges.length > 0 && problems.length > 0 && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAssignJudgeToAllClick}
              >
                Asignar Juez a Todos los Problemas
              </button>
            )}
          </div>
          
          <div className="space-y-4">
            <ProblemsTable
              problems={problems}
              judges={judges}
              handleRemoveJudge={handleRemoveJudge}
              handleAssignJudgeClick={handleAssignJudgeClick}
              handleDeleteClick={handleDeleteClick}
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

      <>
        <input type="hidden" name="competitionId" value={competitionId} />
        <input type="hidden" name="problemId" value={selectedProblemId || ''} />
        <ConfirmDialog
          id="delete_problem_modal"
          title="Confirmar Eliminación"
          message="¿Estás seguro de que deseas eliminar este problema?"
          onConfirm={handleConfirmDelete}
        />
      </>

      <AssignJudgeDialog
        selectedProblemId={selectedProblemId}
        judges={judges}
        problems={problems}
        onConfirm={handleConfirmAssign}
      />
      
      <AssignJudgeToAllDialog
        judges={judges}
        problems={problems}
        competitionId={competitionId}
        onConfirm={handleConfirmAssignAll}
      />
    </div>
  );
} 
