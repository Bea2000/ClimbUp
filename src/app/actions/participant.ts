'use server';

import { SubmissionResult } from "@conform-to/react";

import { isJudgeOfParticipant } from "@/lib/db/judge";
import { findParticipantById } from "@/lib/db/participant";
import { decodeIdInBloat } from "@/lib/encoder";

type ParticipantSearchResult = SubmissionResult & {
  data?: { id: number };
};

export async function searchParticipant(_prevState: unknown, formData: FormData, competitionId: number, judgeId: number): Promise<ParticipantSearchResult> {
  const participantCode = formData.get('participantCode') as string;
  
  try {
    const participantId = decodeIdInBloat(participantCode);
    const participant = await findParticipantById(participantId);
    
    if (!participant) {
      return {
        status: 'error',
        error: { message: ['No se encontró ningún participante con ese código'] },
      };
    }
    
    const isValidJudge = await isJudgeOfParticipant(judgeId, participantId, competitionId);

    if (!isValidJudge) {
      return {
        status: 'error',
        error: { message: ['No tienes permisos para ver este participante'] },
      };
    }

    return {
      status: 'success',
      data: { id: participant.id },
    };
  } catch (error) {
    return {
      status: 'error',
      error: { message: [`Error al buscar participante: ${error as string}`] },
    };
  }
} 
