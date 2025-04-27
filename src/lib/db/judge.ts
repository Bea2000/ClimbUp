import { Prisma } from "@prisma/client";

import prisma from "./prisma";

export async function getJudgesByCompetitionId(competitionId: number) {
  return await prisma.judge.findMany({
    where: {
      competitions: {
        some: {
          id: competitionId,
        },
      },
    },
  });
}

export async function removeJudgeFromCompetitionById(judgeId: number, competitionId: number) {
  return await prisma.judge.update({
    where: { id: judgeId },
    data: {
      competitions: { 
        disconnect: { id: competitionId },
      },
    },
  });
}

export async function getJudgeByEmail(email: string) {
  return await prisma.judge.findFirst({
    where: {
      email,
    },
  });
}

export async function createJudge(judge: Prisma.JudgeCreateInput) {
  return await prisma.judge.create({
    data: judge,
  });
}

export async function findJudgeById(judgeId: number) {
  return await prisma.judge.findFirst({
    where: {
      id: judgeId,
    },
  });
}

export async function linkJudgeWithCompetition(competitionId: number, judgeId: number) {
  return await prisma.judge.update({
    where: { id: judgeId },
    data: {
      competitions: {
        connect: { id: competitionId },
      },
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
