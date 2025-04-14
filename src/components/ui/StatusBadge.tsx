'use client';

import { CompetitionStatus } from "@prisma/client";

import { COMPETITION_STATUS_LABELS, COMPETITION_STATUS_COLORS } from "@/lib/constant/competition.conf";

interface StatusBadgeProps {
  status: CompetitionStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <div className={`badge ${COMPETITION_STATUS_COLORS[status]}`}>
      {COMPETITION_STATUS_LABELS[status]}
    </div>
  );
}
