import { CompetitionStatus } from "@prisma/client";

export function getCompetitionStatusLabel(status: CompetitionStatus): string {
  const statusLabels: Record<CompetitionStatus, string> = {
    NOT_STARTED: "No iniciada",
    IN_PROGRESS: "En progreso",
    FINISHED: "Finalizada",
    CANCELLED: "Cancelada",
  };

  return statusLabels[status];
}

export function getCompetitionStatusColor(status: CompetitionStatus): string {
  const statusColors: Record<CompetitionStatus, string> = {
    NOT_STARTED: "badge-outline",
    IN_PROGRESS: "badge-warning",
    FINISHED: "badge-success",
    CANCELLED: "badge-error",
  };

  return statusColors[status];
}
