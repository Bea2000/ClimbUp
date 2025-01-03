'use server';

import { SubmissionResult } from "@conform-to/react";

import { isJudgeValidForCompetition } from "@/lib/db/judge";

type JudgeValidationResult = SubmissionResult & {
  data?: { 
    judgeId: number;
  };
};

export async function validateJudge(_prevState: unknown, formData: FormData, competitionId: number): Promise<JudgeValidationResult> {
  const rut = formData.get('rut') as string;
  const competitionCode = formData.get('competitionCode') as string;
  
  try {
    const judge = await isJudgeValidForCompetition(rut, competitionCode, competitionId);
    
    if (!judge) {
      return {
        status: 'error',
        error: { message: ['Credenciales inválidas o no tienes permisos para esta competencia'] },
      };
    }

    return {
      status: 'success',
      data: { judgeId: judge.id },
    };
  } catch (error) {
    return {
      status: 'error',
      error: { message: [`Error al validar juez: ${error as string}`] },
    };
  }
} 
