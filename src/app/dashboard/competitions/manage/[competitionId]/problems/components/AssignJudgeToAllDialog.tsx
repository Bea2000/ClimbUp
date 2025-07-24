'use client';

import { Judge } from '@prisma/client';
import React, { useTransition } from 'react';

import { ProblemWithJudges } from '@/types/problem';

interface AssignJudgeToAllDialogProps {
  judges: Judge[];
  problems: ProblemWithJudges[];
  competitionId: number;
  onConfirm: (e: React.FormEvent) => void;
}

export default function AssignJudgeToAllDialog({ 
  judges, 
  problems,
  competitionId,
  onConfirm, 
}: AssignJudgeToAllDialogProps) {
  const [isPending, startTransition] = useTransition();
  
  const availableJudges = judges.filter(judge => 
    !problems.every(problem => 
      problem.judges.some(j => j.id === judge.id),
    ),
  );

  function handleSubmit(e: React.FormEvent) {
    startTransition(() => {
      onConfirm(e);
    });
  }

  return (
    <dialog id="assign_judge_to_all_modal" className="modal">
      <div className="modal-box">
        <h3 className="mb-4 text-lg font-bold">Asignar Juez a Todos los Problemas</h3>
        <p className="mb-4 text-sm text-gray-600">
          Esta acción asignará el juez seleccionado a todos los problemas de la competencia.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="competitionId" value={competitionId} />
          <div className="form-control">
            <label htmlFor="judge-all-select" className="label">
              <span className="label-text">Seleccionar Juez</span>
            </label>
            {availableJudges.length > 0 ? (
              <select id="judge-all-select" name="judgeId" className="select select-bordered w-full">
                <option value="">Seleccione un juez</option>
                {availableJudges.map((judge) => (
                  <option key={judge.id} value={judge.id}>
                    {judge.email}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-sm italic text-gray-500">No hay jueces disponibles para asignar o todos los jueces ya están asignados a todos los problemas</p>
            )}
          </div>
          <div className="modal-action">
            {availableJudges.length > 0 && (
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isPending}
              >
                {isPending ? 'Asignando...' : 'Confirmar'}
              </button>
            )}
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                (document.getElementById('assign_judge_to_all_modal') as HTMLDialogElement)?.close();
              }}
            >
              {availableJudges.length > 0 ? 'Cancelar' : 'Cerrar'}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
