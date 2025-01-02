import { Competition } from "@prisma/client";
import Link from "next/link";

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
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {competitions.map((comp) => (
                  <tr key={comp.id}>
                    <td>{comp.name}</td>
                    <td>{new Date(comp.date).toLocaleDateString()}</td>
                    <td>{comp.location}</td>
                    <td>
                      <Link 
                        href={`/competitions/${comp.id}`}
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
