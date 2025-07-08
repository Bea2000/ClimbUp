'use server';

import { SubmissionResult } from "@conform-to/react";

import { isJudgeOfParticipant, getJudgeCompetitionProblems } from "@/lib/db/judge";
import { findParticipantWithCompetitionAndProblemsByIdAndCompetitionId } from "@/lib/db/participant";
import { assignProblemToParticipant, updateParticipantProblemInformation } from "@/lib/db/problem";
import { ParticipantWithCompetitionAndProblems } from "@/types/participant";

type ParticipantSearchResult = SubmissionResult & {
  data?: { participant: ParticipantWithCompetitionAndProblems };
};

export async function searchParticipant(_prevState: unknown, formData: FormData, competitionId: number, judgeId: number): Promise<ParticipantSearchResult> {
  const participantCode = formData.get('participantCode') as string;
  
  try {
    const participant = await findParticipantWithCompetitionAndProblemsByIdAndCompetitionId(parseInt(participantCode), competitionId);
    
    if (!participant) {
      return {
        status: 'error',
        error: { message: ['No se encontró ningún participante con ese código'] },
      };
    }
    
    const isValidJudge = await isJudgeOfParticipant(judgeId, participant.id, competitionId);

    if (!isValidJudge) {
      return {
        status: 'error',
        error: { message: ['No tienes permisos para ver este participante'] },
      };
    }

    const judgeProblems = await getJudgeCompetitionProblems(judgeId, competitionId);
    
    const availableProblems = judgeProblems.filter((problem) => 
      !participant.competition.problems.find((prob) => 
        (prob.problemId === problem.id && prob.completed) || 
        (prob.problemId === problem.id && prob.attempts >= problem.attempts),
      ),
    );

    if (availableProblems.length === 0) {
      return {
        status: 'error',
        error: { message: ['No hay problemas disponibles para este participante que puedas revisar'] },
      };
    }

    return {
      status: 'success',
      data: { participant },
    };
  } catch (error) {
    return {
      status: 'error',
      error: { message: [`Error al buscar participante: ${error as string}`] },
    };
  }
} 

export async function addProblemToParticipant(participantId: number, problemId: number, competitionId: number) {
  const participant = await findParticipantWithCompetitionAndProblemsByIdAndCompetitionId(participantId, competitionId);
  if (!participant) {
    return {
      status: 'error',
      error: { message: ['No se encontró ningún participante con ese código'] },
    };
  }

  let problem = null;

  if (participant.competition.problems.length > 0) {
    problem = participant.competition.problems.find((problem) => problem.problemId === problemId);
  }

  if (!problem) {
    await assignProblemToParticipant(participantId, problemId, competitionId);
  }

  return {
    status: 'success',
    data: { participant },
  };
}

export async function addProblemInformationToParticipant(participantId: number, problemId: number, competitionId: number, completed: boolean) {
  const participant = await findParticipantWithCompetitionAndProblemsByIdAndCompetitionId(participantId, competitionId);
  if (!participant) {
    return {
      status: 'error',
      error: { message: ['No se encontró ningún participante con ese código'] },
    };
  }

  let problem = null;
  problem = participant.competition.problems.find((problem) => problem.problemId === problemId);
  if (!problem) {
    problem = await assignProblemToParticipant(participantId, problemId, competitionId);
  }
  
  if (completed) {
    await updateParticipantProblemInformation(problemId, participantId, competitionId, { completed, attempts: problem.attempts + 1 });
  } else {
    await updateParticipantProblemInformation(problemId, participantId, competitionId, { attempts: problem.attempts + 1 });
  }

  return {
    status: 'success',
    data: { participant },
  };
}
