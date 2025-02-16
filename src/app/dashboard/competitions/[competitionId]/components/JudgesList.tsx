'use client';

import Link from 'next/link';

import { Collapse } from "@/components/ui/Collapse";
import { JudgeWithUser } from "@/types/judge";

interface JudgesListProps {
  judges: JudgeWithUser[];
  competitionId: number;
}

export function JudgesList({ judges, competitionId }: JudgesListProps) {
  return (
    <Collapse title="Jueces">
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th className="text-right">
                <Link
                  href={`/dashboard/competitions/manage/${competitionId}/judges`}
                  className="btn btn-primary btn-sm"
                >
                  Gestionar jueces
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {judges.map((judge) => (
              <tr key={judge.id}>
                <td>{judge.user.name}</td>
                <td>{judge.user.email}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Collapse>
  );
}
