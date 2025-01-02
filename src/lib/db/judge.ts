import prisma from "./prisma";

export async function isJudgeValidForCompetition(rut: string, competitionCode: string, competitionId: number) {
  const user = await prisma.user.findFirst({
    where: {
      rut,
    },
  });

  if (!user) {
    return null;
  }

  const judge = await prisma.judge.findFirst({
    where: {
      userId: user.id,
      competitionId,
    },
  });

  if (!judge) {
    return null;
  }

  const competition = await prisma.competition.findFirst({
    where: {
      id: competitionId,
      code: competitionCode,
    },
  });

  if (!competition) {
    return null;
  }

  return judge;
}
