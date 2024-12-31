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
