import { Competition } from "@prisma/client";
import Link from "next/link";

interface CompetitionsListProps {
  competitions: Competition[];
}

export default function CompetitionsList({ competitions }: CompetitionsListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Ubicación</th>
            <th>Duración (hrs)</th>
            <th>Código</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {competitions.map((competition) => (
            <tr key={competition.id}>
              <td>{competition.name}</td>
              <td>{new Date(competition.date).toLocaleDateString()}</td>
              <td>{competition.location}</td>
              <td>{competition.duration}</td>
              <td>{competition.code}</td>
              <td>
                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/competitions/${competition.id}`}
                    className="btn btn-sm btn-primary"
                  >
                    Ver detalles
                  </Link>
                </div>
              </td>
            </tr>
          ))}
          {competitions.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center">
                No hay competencias registradas
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
