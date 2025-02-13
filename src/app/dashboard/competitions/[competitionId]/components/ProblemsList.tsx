'use client';

import { NotePencil } from "@phosphor-icons/react";
import { Problem } from "@prisma/client";

interface ProblemsListProps {
  problems: Problem[];
}

export function ProblemsList({ problems }: ProblemsListProps) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Problemas</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Nivel</th>
              <th>Puntos Máximos</th>
              <th>Intentos</th>
              <th>Descuento por Intento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {[...problems]
              .map((problem) => (
                <tr key={problem.id}>
                  <td>{problem.name || `Problema ${problem.level}`}</td>
                  <td>
                    <div className="badge badge-primary">Nivel {problem.level}</div>
                  </td>
                  <td>{problem.maxPoints}</td>
                  <td>{problem.attempts}</td>
                  <td>{problem.discountPerAttempt}</td>
                  <td>
                    <button className="btn btn-ghost btn-xs">
                      <NotePencil size={20} color="#a6adbb" weight="light" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
