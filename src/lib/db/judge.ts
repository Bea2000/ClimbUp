import { User } from "@prisma/client";

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

export async function removeJudgeFromCompetitionById(judgeId: number, competitionId: number) {
  return await prisma.judge.delete({
    where: {
      id: judgeId,
      competitionId,
    },
  });
}

export async function findJudgeByUserIdAndCompetitionId(userId: number, competitionId: number) {
  return await prisma.judge.findFirst({
    where: {
      userId,
      competitionId,
    },
  });
}

export async function linkJudgeWithUser(competitionId: number, user: User, organizerId: number) {
  return await prisma.judge.create({
    data: {
      userId: user.id,
      competitionId,
      organizerId,
    },
  });
}

export async function removeJudgeFromProblem(problemId: number, judgeId: number) {
  return await prisma.problem.update({
    where: { id: problemId },
    data: {
      judges: {
        disconnect: { id: judgeId },
      },
    },
  });
}

export async function getJudgeByRut(rut: string) {
  const users = await prisma.user.findMany({
    where: {
      rut,
    },
  });

  if (users.length === 0) {
    return null;
  }

  for (const user of users) {
    const judge = await prisma.judge.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (judge) {
      return judge;
    }
  }

  return null;
}

export async function isJudgeOfParticipant(judgeId: number, participantId: number, competitionId: number) {
  const competition = await prisma.competition.findFirst({
    where: {
      AND: [
        { id: competitionId },
        { judges: { some: { id: judgeId } } },
        { participants: { some: { id: participantId } } },
      ],
    },
  });

  return !!competition;
}
