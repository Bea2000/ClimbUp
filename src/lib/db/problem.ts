import { ParticipantProblem } from "@prisma/client";

import { CreateProblem } from "@/types/problem";

import { getParticipantCompetitionByParticipantIdAndCompetitionId } from "./participant";
import prisma from "./prisma";

export async function addProblemToCompetition(competitionId: number, problem: CreateProblem) {
  return await prisma.problem.create({
    data: {
      ...problem,
      competitionId,
    },
  });
}

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

export async function linkProblemWithJudge(problemId: number, judgeId: number) {
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
      judges: true,
    },
  });
}

export async function assignProblemToParticipant(participantId: number, problemId: number, competitionId: number) {
  const participantCompetition = await getParticipantCompetitionByParticipantIdAndCompetitionId(participantId, competitionId);

  if (!participantCompetition) {
    throw new Error('Participant competition not found');
  }
  
  return await prisma.participantProblem.create({
    data: {
      participantCompetitionId: participantCompetition.id,
      participantId,
      problemId,
    },
  });
}

export async function getParticipantProblemByProblemIdAndParticipantIdAndCompetitionId(problemId: number, participantId: number, competitionId: number) {
  return await prisma.participantProblem.findFirst({
    where: {
      problemId,
      participantId,
      participantCompetitionId: competitionId,
    },
  });
}

export async function updateParticipantProblemInformation(problemId: number, participantId: number, competitionId: number, data: Partial<ParticipantProblem>) {
  const participantCompetition = await getParticipantCompetitionByParticipantIdAndCompetitionId(participantId, competitionId);

  if (!participantCompetition) {
    throw new Error('Participant competition not found');
  }

  const participantProblem = await getParticipantProblemByProblemIdAndParticipantIdAndCompetitionId(problemId, participantId, participantCompetition.id);

  if (!participantProblem) {
    throw new Error('Participant problem not found');
  }

  return await prisma.participantProblem.update({
    where: {
      id: participantProblem.id,
    },
    data,
  });
}
