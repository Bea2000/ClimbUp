import { Judge } from "@prisma/client";

import { ProblemWithJudges } from "@/types/problem";

interface ProblemsTableProps {
  problems: ProblemWithJudges[];
  handleRemoveJudge: (problemId: number, judgeId: number) => void;
  handleAssignJudgeClick: (problemId: number) => void;
  handleDeleteClick: (problemId: number) => void;
  judges: Judge[];
}

export default function ProblemsTable({ problems, handleRemoveJudge, handleAssignJudgeClick, handleDeleteClick, judges }: ProblemsTableProps) {
  return (
    problems.map((problem) => (
      <div key={problem.id} className="flex items-center justify-between rounded-lg border p-4">
        <div className="flex-1">
          <h3 className="font-semibold">{problem.name}</h3>
          <p className="text-sm text-gray-600">Nivel: {problem.level}</p>
          <p className="text-sm text-gray-600">Puntaje Máximo: {problem.maxPoints}</p>
                
          <div className="mt-2">
            <h4 className="text-sm font-medium text-gray-400">Jueces asignados:</h4>
            {problem.judges.length > 0 ? (
              <div className="mt-1 flex flex-wrap gap-2">
                {problem.judges.map((judge) => (
                  <span
                    key={judge.id}
                    className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                  >
                    {judge.user.name} - {judge.user.email}
                    <button
                      onClick={() => handleRemoveJudge(problem.id, judge.id)}
                      className="ml-1.5 text-blue-600 hover:text-blue-800"
                      title="Remover juez"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="size-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm italic text-gray-500">No hay jueces asignados</p>
            )}
          </div>
        </div>
              
        <div className="flex gap-2">
          {judges.length > 0 && (
            <button
              type="button"
              onClick={() => handleAssignJudgeClick(problem.id)}
              className="btn btn-primary btn-sm"
            >
                    Asignar Juez
            </button>
          )}
          <button
            type="button"
            onClick={() => handleDeleteClick(problem.id)}
            className="btn btn-error btn-sm"
          >
                  Eliminar
          </button>
        </div>
      </div>
    ))
  )
}
