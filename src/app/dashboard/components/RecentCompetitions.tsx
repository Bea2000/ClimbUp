import { Competition } from "@prisma/client";

export default function RecentCompetitions({ competitions }: { competitions: Competition[] }) {
  return (
    <div className="collapse collapse-plus bg-base-100">
      <input type="checkbox" defaultChecked /> 
      <div className="collapse-title text-xl font-medium">
        Competencias Recientes
      </div>
      <div className="collapse-content">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Fecha</th>
                <th>Ubicación</th>
              </tr>
            </thead>
            <tbody>
              {competitions.map((comp) => (
                <tr key={comp.id}>
                  <td>{comp.name}</td>
                  <td>{new Date(comp.date).toLocaleDateString()}</td>
                  <td>{comp.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 
