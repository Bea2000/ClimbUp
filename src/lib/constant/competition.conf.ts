import { CompetitionStatus } from "@prisma/client";

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

export const fieldTypeOptions = ['Texto', 'Número', 'Email', 'Teléfono', 'Fecha', 'Hora', 'Checkbox', 'RUT']

export const participantIdentifierOptions = ['RUT', 'Email', 'Teléfono']
