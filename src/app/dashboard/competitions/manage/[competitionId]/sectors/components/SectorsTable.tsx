import { Sector } from "@prisma/client";

interface SectorsTableProps {
  sectors: Sector[];
  handleDeleteClick: (sectorId: number) => void;
}

export default function SectorsTable({ sectors, handleDeleteClick }: SectorsTableProps) {
  return (
    <div className="space-y-4">
      {sectors.map((sector) => (
        <div key={sector.id} className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex-1">
            <h3 className="font-semibold">{sector.name}</h3>
            {sector.description && (
              <p className="text-sm text-gray-600">{sector.description}</p>
            )}
            <p className="text-xs text-gray-400 mt-1">
              ID: {sector.id} • Creado: {new Date(sector.createdAt).toLocaleDateString()}
            </p>
          </div>
              
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleDeleteClick(sector.id)}
              className="btn btn-danger btn-sm"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
