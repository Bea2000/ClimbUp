'use client';

import { Problem } from "@prisma/client";
import Link from 'next/link';

import { Collapse } from "@/components/ui/Collapse";

interface ProblemsListProps {
  problems: Problem[];
  competitionId: number;
}

export function ProblemsList({ problems, competitionId }: ProblemsListProps) {
  return (
    <Collapse title="Problemas">
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Nivel</th>
              <th>Puntos Máximos</th>
              <th>Intentos</th>
              <th>Descuento por Intento</th>
              <th className="text-right">
                <Link
                  href={`/dashboard/competitions/manage/${competitionId}/problems`}
                  className="btn btn-primary btn-sm"
                >
                  Gestionar problemas
                </Link>
              </th>
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
                  <td></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Collapse>
  );
}
