'use client';

import { Judge } from '@prisma/client';
import React, { useTransition } from 'react';


import { ProblemWithJudges } from '@/types/problem';

interface AssignJudgeDialogProps {
  selectedProblemId: number | null;
  judges: Judge[];
  problems: ProblemWithJudges[];
  onConfirm: (e: React.FormEvent) => void;
}

export default function AssignJudgeDialog({ 
  selectedProblemId, 
  judges, 
  problems,
  onConfirm, 
}: AssignJudgeDialogProps) {
  const [isPending, startTransition] = useTransition();
  
  const selectedProblem = problems.find(p => p.id === selectedProblemId);
  
  const availableJudges = judges.filter(judge => 
    !selectedProblem?.judges.some(assignedJudge => assignedJudge.id === judge.id),
  );

  function handleSubmit(e: React.FormEvent) {
    startTransition(() => {
      onConfirm(e);
    });
  }

  return (
    <dialog id="assign_judge_modal" className="modal">
      <div className="modal-box">
        <h3 className="mb-4 text-lg font-bold">Asignar Juez al Problema</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="problemId" value={selectedProblemId || ''} />
          <div className="form-control">
            <label htmlFor="judge-select" className="label">
              <span className="label-text">Seleccionar Juez</span>
            </label>
            {availableJudges.length > 0 ? (
              <select id="judge-select" name="judgeId" className="select select-bordered w-full">
                <option value="">Seleccione un juez</option>
                {availableJudges.map((judge) => (
                  <option key={judge.id} value={judge.id}>
                    {judge.user.name}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-sm italic text-gray-500">No hay jueces disponibles para asignar</p>
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
                (document.getElementById('assign_judge_modal') as HTMLDialogElement)?.close();
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
