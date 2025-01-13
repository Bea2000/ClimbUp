'use server';

import { SubmissionResult } from '@conform-to/react';
import { User } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { ManageJudgeSchema } from '@/app/dashboard/competitions/manage/[competitionId]/judges/schemas/manageJudgesSchema';
import { getUserFromSession } from '@/lib/auth';
import { findJudgeByUserIdAndCompetitionId, linkJudgeWithUser, removeJudgeFromCompetitionById } from '@/lib/db/judge';
import { createJudgeUser, findUserByEmailOrRut } from '@/lib/db/user';

export async function deleteJudge(_prevState: unknown, formData: FormData): Promise<SubmissionResult> {
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

export async function addJudgeToCompetition(_prevState: unknown, formData: FormData): Promise<SubmissionResult> {

  try {
    const userSession = await getUserFromSession();
    const parsed = ManageJudgeSchema.parse({
      competitionId: Number(formData.get('competitionId')),
      name: formData.get('name'),
      email: formData.get('email'),
      rut: formData.get('rut'),
    });

    let user: User | undefined;

    user = await findUserByEmailOrRut(parsed.email, parsed.rut);

    if (!user) {
      user = await createJudgeUser({
        name: parsed.name,
        email: parsed.email,
        rut: parsed.rut,
      });
    }

    if (!user) {
      return {
        status: 'error',
        error: { message: ['Error al crear el juez'] },
      };
    }

    const existingJudge = await findJudgeByUserIdAndCompetitionId(user.id, parsed.competitionId);

    if (existingJudge) {
      return {
        status: 'error',
        error: { message: ['El juez ya existe'] },
      };
    }

    await linkJudgeWithUser(parsed.competitionId, user, userSession.organizerId);

    revalidatePath(`/dashboard/competitions/manage/${parsed.competitionId}/judges`);

    return {
      status: 'success',
    };
  } catch {
    return {
      status: 'error',
      error: {
        message: ['Error al agregar el juez'],
      },
    };
  }
}
