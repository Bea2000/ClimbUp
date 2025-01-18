import { CompetitionData } from "@/types/competition";
  
import prisma from "./prisma";

export async function createNewCompetition(competition: CompetitionData) {
  const { name, location, date, duration, code, organizerId } = competition;
  const newCompetition = await prisma.competition.create({
    data: {
      name,
      location,
      date,
      duration,
      code,
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
