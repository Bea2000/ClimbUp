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

export async function getParticipantsForCompetition(competitionId: number) {
  return await prisma.participant.findMany({
    where: {
      competitionId,
    },
  });
}
