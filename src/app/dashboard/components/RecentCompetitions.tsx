import { Competition } from "@prisma/client";
import Link from "next/link";

import { Collapse } from "@/components/ui/Collapse";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function RecentCompetitions({ competitions }: { competitions: Competition[] }) {
  return (
    <Collapse title="Competencias Recientes">
      <div className="w-full">
        <div className="w-screen overflow-x-auto">
          <table className="table min-w-[800px]">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Fecha</th>
                <th>Ubicación</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {competitions.map((competition) => (
                <tr key={competition.id}>
                  <td>{competition.name}</td>
                  <td>{new Date(competition.date).toLocaleDateString()}</td>
                  <td>{competition.location}</td>
                  <td><StatusBadge status={competition.status} /></td>
                  <td>
                    <Link 
                      href={`dashboard/competitions/${competition.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Ver competencia
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Collapse>
  );
} 
