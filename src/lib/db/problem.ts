import prisma from "./prisma";

export async function removeProblemFromCompetition(competitionId: number, problemId: number) {
  return await prisma.problem.delete({
    where: { id: problemId, competitionId },
  });
}

export async function getProblemsByCompetitionId(competitionId: number) {
  return await prisma.problem.findMany({
    where: { competitionId },
  });
}

export async function updateProblemJudge(problemId: number, judgeId: number) {
  return await prisma.problem.update({
    where: { id: problemId },
    data: {
      judges: {
        connect: {
          id: judgeId,
        },
      },
    },
  });
}

export async function getProblemsWithJudgesByCompetitionId(competitionId: number) {
  return await prisma.problem.findMany({
    where: {
      competitionId,
    },
    include: {
      judges: {
        include: {
          user: true,
        },
      },
    },
  });
}
