import { Participant, ParticipantStatus } from "@prisma/client";

import { ParticipantWithCompetitionInformation } from "@/types/participant";

import { getLastCompetitionForOrganizer, getParticipantsCountForCompetitionByCompetitionId } from "./competition";
import prisma from "./prisma";

export async function createNewParticipant(rut: string): Promise<Participant> {
  const existingParticipant = await prisma.participant.findFirst({
    where: {
      rut,
    },
  });

  if (existingParticipant) {
    return existingParticipant;
  }
  
  const participant = await prisma.participant.create({
    data: {
      rut,
    },
  });

  return participant;
}

export async function addParticipantToCompetition(competitionId: number, fields: Record<string, string>, participantId: number) {
  await prisma.participantCompetition.create({
    data: {
      participantId,
      status: ParticipantStatus.PENDING,
      competitionId,
      userInformation: fields,
    },
  });
}

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

export async function getParticipantsInformationByCompetitionId(competitionId: number): Promise<ParticipantWithCompetitionInformation[]> {
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

export async function getParticipantCompetitionByRutAndCompetitionId(rut: string, competitionId: number) {
  return await prisma.participantCompetition.findFirst({
    where: {
      participant: { rut },
      competitionId,
    },
  });
}
