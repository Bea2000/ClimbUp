import { Judge } from "@prisma/client";

interface JudgesListProps {
  judges: Judge[];
}

export default function JudgesList({ judges }: JudgesListProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th className="text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {judges.map((judge) => (
            <tr key={judge.id}>
              <td>{judge.id}</td>
              <td>{judge.email}</td>
              <td className="text-right">
                <div className="flex gap-2 justify-end">
                  <button
                    className="btn btn-primary btn-sm btn-disabled"
                  >
                    Ver detalles
                  </button>
                  <button
                    className="btn btn-secondary btn-sm btn-disabled"
                  >
                    Editar
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {judges.length === 0 && (
            <tr>
              <td className="text-center" colSpan={3}>
                No hay jueces registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
