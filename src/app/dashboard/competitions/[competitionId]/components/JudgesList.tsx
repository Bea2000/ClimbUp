'use client';

import { Collapse } from "@/components/ui/Collapse";
import { JudgeWithUser } from "@/types/judge";

export function JudgesList({ judges }: { judges: JudgeWithUser[] }) {
  return (
    <Collapse title="Jueces">
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {judges.map((judge) => (
              <tr key={judge.id}>
                <td>{judge.user.name}</td>
                <td>{judge.user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Collapse>
  );
}
