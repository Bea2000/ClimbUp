import { ParticipantStatus } from "@prisma/client";

import { getLastCompetitionForOrganizer } from "./competition";
import prisma from "./prisma";

export async function getParticipantsCountForOrganizer(organizerId: number) {
  return await prisma.participant.count({
    where: {
      competition: {
        organizerId,
      },
    },
  });
}

export async function getLastCompetitionParticipantsCountForOrganizer(organizerId: number) {
  const competitionId = await getLastCompetitionForOrganizer(organizerId);
  return await prisma.participant.count({
    where: {
      competition: {
        id: competitionId,
      },
    },
  });
}

export async function getUnconfirmedParticipantsCountForOrganizer(organizerId: number) {
  return await prisma.participant.count({
    where: {
      competition: {
        organizerId,
      },
      status: "PENDING",
    },
  });
}

export async function getParticipantsWithUserByCompetitionId(competitionId: number) {
  return await prisma.participant.findMany({
    where: {
      competitionId,
    },
    include: {
      user: true,
    },
  });
}

export async function updateParticipantStatuses(updates: { id: number, status: ParticipantStatus }[]) {
  const updatePromises = updates.map(update => prisma.participant.update({
    where: { id: update.id },
    data: { status: update.status },
  }));
  await Promise.all(updatePromises);
}

export async function findParticipantById(id: number) {
  const participant = await prisma.participant.findUnique({
    where: {
      id,
    },
  });

  return participant;
}
