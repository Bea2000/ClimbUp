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
              {competitions.map((comp) => (
                <tr key={comp.id}>
                  <td>{comp.name}</td>
                  <td>{new Date(comp.date).toLocaleDateString()}</td>
                  <td>{comp.location}</td>
                  <td><StatusBadge status={comp.status} /></td>
                  <td>
                    <Link 
                      href={`dashboard/competitions/${comp.id}`}
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
