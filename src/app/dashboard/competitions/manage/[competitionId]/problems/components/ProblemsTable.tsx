import { Sector } from "@prisma/client";

import { ProblemWithSector } from "@/types/problem";

interface ProblemsTableProps {
  problems: ProblemWithSector[];
  handleDeleteClick: (problemId: number) => void;
  handleRemoveSector: (problemId: number, sectorId: number) => void;
  handleAssignSectorClick: (problemId: number) => void;
  sectors: Sector[];
}

export default function ProblemsTable({ problems, handleDeleteClick, handleRemoveSector, handleAssignSectorClick, sectors }: ProblemsTableProps) {
  const sortedProblems = [...problems].sort((a, b) => a.maxPoints - b.maxPoints);
  
  return (
    sortedProblems.map((problem) => (
      <div key={problem.id} className="flex items-center justify-between rounded-lg border p-4">
        <div className="flex-1">
          <h3 className="font-semibold">{problem.name}</h3>
          <p className="text-sm text-gray-600">Nivel: {problem.level}</p>
          <p className="text-sm text-gray-600">Puntaje Máximo: {problem.maxPoints}</p>
                
          <div className="mt-2">
            <h4 className="text-sm font-medium text-gray-400">Sector asignado:</h4>
            {problem.sector ? (
              <div className="mt-1 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  {problem.sector.name}
                  <button
                    onClick={() => handleRemoveSector(problem.id, problem.sector!.id)}
                    className="ml-1.5 text-green-600 hover:text-green-800"
                    title="Remover sector"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              </div>
            ) : (
              <p className="text-sm italic text-gray-500">No hay sector asignado</p>
            )}
          </div>
        </div>
              
        <div className="flex gap-2">
          {sectors.length > 0 && !problem.sector && (
            <button
              type="button"
              onClick={() => handleAssignSectorClick(problem.id)}
              className="btn btn-secondary btn-sm"
            >
              Asignar Sector
            </button>
          )}
          <button
            type="button"
            onClick={() => handleDeleteClick(problem.id)}
            className="btn btn-danger btn-sm"
          >
            Eliminar
          </button>
        </div>
      </div>
    ))
  )
}
