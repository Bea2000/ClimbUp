import { ParticipantStatus } from "@prisma/client";

import { ParticipantWithInformation } from "@/types/participant";

import { getLastCompetitionForOrganizer, getParticipantsCountForCompetitionByCompetitionId } from "./competition";
import prisma from "./prisma";

export async function getParticipantsCountForOrganizer(organizerId: number) {
  const competitions = await prisma.competition.findMany({
    where: {
      organizerId,
    },
    include: {
      participants: true,
    },
  });
  return competitions.reduce((acc, competition) => acc + competition.participants.length, 0);
}

export async function getLastCompetitionParticipantsCountForOrganizer(organizerId: number) {
  const competitionId = await getLastCompetitionForOrganizer(organizerId);
  if (!competitionId) {
    return 0;
  }
  return await getParticipantsCountForCompetitionByCompetitionId(competitionId);
}

export async function getUnconfirmedParticipantsCountForCompetitionByCompetitionId(competitionId: number) {
  return await prisma.participantCompetition.count({
    where: {
      competitionId,
      status: "PENDING",
    },
  });
}

export async function getParticipantsByCompetitionId(competitionId: number) {
  return await prisma.participant.findMany({
    where: {
      competitions: {
        some: {
          id: competitionId,
        },
      },
    },
  });
}

export async function getParticipantsInformationByCompetitionId(competitionId: number): Promise<ParticipantWithInformation[]> {
  const participants = await prisma.participantCompetition.findMany({
    where: {
      competitionId,
    },
    include: {
      participant: true,
    },
  });
  return participants.map(participant => ({
    ...participant.participant,
    competitionsInformation: participant,
  }));
}

export async function updateParticipantStatuses(updates: { participantId: number, competitionId: number, status: ParticipantStatus }[]) {
  const updatePromises = updates.map(update => prisma.participantCompetition.updateMany({
    where: {
      participantId: update.participantId,
      competitionId: update.competitionId,
    },
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
