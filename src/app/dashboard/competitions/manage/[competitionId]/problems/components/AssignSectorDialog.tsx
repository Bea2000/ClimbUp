"use client";

import { Sector } from "@prisma/client";
import { useState } from "react";

import Dialog from "@/components/Dialog";

interface AssignSectorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (sectorId: number) => void;
  sectors: Sector[];
  problemName: string;
}

export default function AssignSectorDialog({
  isOpen,
  onClose,
  onAssign,
  sectors,
  problemName,
}: AssignSectorDialogProps) {
  const [selectedSectorId, setSelectedSectorId] = useState<string>("");

  function handleAssign() {
    if (selectedSectorId) {
      onAssign(Number(selectedSectorId));
      setSelectedSectorId("");
      onClose();
    }
  }

  const sectorLabels = sectors.map((sector) => (
    sector.description 
      ? `${sector.name} - ${sector.description}`
      : sector.name
  ));

  return (
    <Dialog 
      id="assign-sector-dialog"
      isOpen={isOpen} 
      onClose={onClose} 
      title={`Asignar sector a ${problemName}`}
      actions={
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleAssign}
            disabled={!selectedSectorId}
            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Asignar Sector
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Selecciona el sector al que deseas asignar este problema:
        </p>
        
        <div className="form-control">
          <label htmlFor="sector" className="label">
            <span className="label-text">Sector</span>
          </label>
          <select
            id="sector"
            name="sector"
            className="select select-bordered w-full"
            value={selectedSectorId}
            onChange={(e) => setSelectedSectorId(e.target.value)}
            required
          >
            <option value="">Selecciona un sector</option>
            {sectors.map((sector, index) => (
              <option key={sector.id} value={sector.id.toString()}>
                {sectorLabels[index]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Dialog>
  );
}
