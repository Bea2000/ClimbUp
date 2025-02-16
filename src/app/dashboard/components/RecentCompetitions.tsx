import { Competition } from "@prisma/client";
import { format } from 'date-fns';
import Link from "next/link";

import { getCompetitionStatusLabel, getCompetitionStatusColor } from "@/lib/helpers/competition";

export default function RecentCompetitions({ competitions }: { competitions: Competition[] }) {
  return (
    <div className="collapse collapse-plus bg-base-100">
      <input type="checkbox" defaultChecked /> 
      <div className="collapse-title text-xl font-medium">
        Competencias Recientes
      </div>
      <div className="collapse-content">
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
                    <td>{format(new Date(comp.date), 'dd/MM/yyyy, HH:mm')}</td>
                    <td>{comp.location}</td>
                    <td><div className={`badge ${getCompetitionStatusColor(comp.status)}`}>{getCompetitionStatusLabel(comp.status)}</div></td>
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
      </div>
    </div>
  );
} 
