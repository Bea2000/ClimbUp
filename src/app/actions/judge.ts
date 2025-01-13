'use server';

import { SubmissionResult } from '@conform-to/react';
import { revalidatePath } from 'next/cache';

import { removeJudgeFromCompetitionById } from '@/lib/db/judge';

type ActionState = {
  status: 'success' | 'error';
  error?: {
    message: string[];
  };
};

export async function deleteJudge(_prevState: unknown, formData: FormData): Promise<ActionState> {
  try {
    const competitionId = Number(formData.get('competitionId'));
    const judgeId = Number(formData.get('judgeId'));

    await removeJudgeFromCompetitionById(judgeId, competitionId);

    revalidatePath(`/dashboard/competitions/manage/${competitionId}/judges`);
    
    return {
      status: 'success',
    };
  } catch {
    return {
      status: 'error',
      error: {
        message: ['Error al eliminar el juez'],
      },
    };
  }
}
