import { ClimbingGrade, Prisma } from "@prisma/client";

import { CompetitionData, RegisterFormSettings } from "@/types/competition";

import prisma from "./prisma";

export async function createNewCompetition(competition: CompetitionData) {
  const { name, location, date, duration, code, organizerId, levelType } = competition;
  const newCompetition = await prisma.competition.create({
    data: {
      name,
      location,
      date,
      duration,
      code,
      levelType,
      organizer: {
        connect: {
          id: organizerId,
        },
      },
    },
  });
  return newCompetition;
}

export async function getThisYearCompetitionsCountForOrganizer(organizerId: number) {
  return await prisma.competition.count({
    where: {
      organizerId,
      date: {
        gte: new Date(new Date().getFullYear(), 0, 1),
        lt: new Date(new Date().getFullYear() + 1, 0, 1),
      },
    },
  });
}

export async function getLastCompetitionForOrganizer(organizerId: number) {
  const lastCompetition = await prisma.competition.findFirst({
    where: {
      organizerId,
      date: {
        lt: new Date(),
      },
    },
    orderBy: {
      date: "desc",
    },
  });
  return lastCompetition?.id;
}

export async function getScheduledCompetitionsCountForOrganizer(organizerId: number) {
  return await prisma.competition.count({
    where: {
      organizerId,
      date: {
        gte: new Date(),
      },
    },
  });
}

export async function getLastNCompetitionsForOrganizer(organizerId: number, n: number) {
  return await prisma.competition.findMany({
    where: {
      organizerId,
    },
    orderBy: {
      date: "desc",
    },
    take: n,
  });
}

export async function getCompetitionsByJudgeId(judgeId: number, organizerId: number) {
  return await prisma.competition.findMany({
    where: {
      judges: {
        some: {
          id: judgeId,
        },
      },
      organizerId,
    },
  });
}

export async function getCompetitionsForOrganizerId(organizerId: number) {
  return await prisma.competition.findMany({
    where: {
      organizerId,
    },
    orderBy: {
      date: "desc",
    },
  });
}

export async function getCompetitionById(competitionId: number) {
  return await prisma.competition.findUnique({
    where: {
      id: competitionId,
    },
  });
}

export async function getCompetitionByIdWithOrganizerProblemsParticipantsAndJudges(competitionId: number) {
  return await prisma.competition.findUnique({
    where: {
      id: competitionId,
    },
    include: {
      organizer: true,
      problems: true,
      participants: {
        include: {
          user: true,
        },
      },
      judges: {
        include: {
          user: true,
        },
      },
    },
  });
}

export async function isCompetitionOfOrganizer(competitionId: number, organizerId: number) {
  return await prisma.competition.findFirst({
    where: { id: competitionId, organizerId },
  });
}

export async function getLevelTypeFromCompetitionByCompetitionId(competitionId: number): Promise<ClimbingGrade> {
  const result = await prisma.competition.findUnique({
    where: { id: competitionId },
    select: { levelType: true },
  });
  if (!result) {
    throw new Error(`Competition with ID ${competitionId} not found.`);
  }

  return result.levelType;
}

export async function updateCompetitionById(competitionId: number, competitionData: Prisma.CompetitionUpdateInput) {  
  return await prisma.competition.update({  
    where: { id: competitionId },  
    data: competitionData,  
  });  

export async function addRegisterFormSettingsToCompetitionById(registerFormSettings: RegisterFormSettings, competitionId: number) {
  return await prisma.competition.update({
    where: {
      id: competitionId,
    },
    data: {
      registerFormSettings,
    },
  });
}
