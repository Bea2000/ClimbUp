import { CompetitionStatus } from "@prisma/client";

export const fieldTypeOptions = ['Texto', 'Número', 'Email', 'Teléfono', 'Fecha', 'Hora', 'Checkbox']

export const COMPETITION_STATUS_LABELS: Record<CompetitionStatus, string> = {
  NOT_STARTED: "No iniciada",
  IN_PROGRESS: "En progreso",
  FINISHED: "Finalizada",
  CANCELLED: "Cancelada",
};

export const COMPETITION_STATUS_COLORS: Record<CompetitionStatus, string> = {
  NOT_STARTED: "badge-neutral",
  IN_PROGRESS: "badge-warning",
  FINISHED: "badge-success",
  CANCELLED: "badge-error",
};

export const participantIdentifierOptions = ['RUT', 'Email', 'Teléfono']

export function getStatusColor(status: CompetitionStatus) {
  switch (status) {
  case 'NOT_STARTED':
    return 'bg-blue-500'
  case 'IN_PROGRESS':
    return 'bg-green-500'
  case 'FINISHED':
    return 'bg-gray-500'
  case 'CANCELLED':
    return 'bg-red-500'
  default:
    return 'bg-blue-500'
  }
}
  
export function getStatusText(status: CompetitionStatus) {
  switch (status) {
  case 'NOT_STARTED':
    return 'Próximamente'
  case 'IN_PROGRESS':
    return 'En progreso'
  case 'FINISHED':
    return 'Completado'
  case 'CANCELLED':
    return 'Cancelado'
  default:
    return 'Próximamente'
  }
}
