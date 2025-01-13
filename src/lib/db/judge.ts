import prisma from "./prisma";

export async function getJudgesUsersByCompetitionId(competitionId: number) {
  return await prisma.judge.findMany({
    where: {
      competitionId,
    },
    include: {
      user: true,
    },
  });
}
