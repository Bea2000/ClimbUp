'use server';

import { SubmissionResult } from "@conform-to/react";
import { Organizer } from "@prisma/client";
import { revalidatePath } from 'next/cache';
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { getOrganizerById, updateOrganizerName } from '@/lib/db/organizer';

type OrganizerSubmissionResult = SubmissionResult & {
  data?: Organizer;
};

export async function getOrganizerSettings(): Promise<OrganizerSubmissionResult> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !session?.user?.organizerId) {
      return { status: 'error', error: { message: ['No se ha iniciado sesión'] } };
    }
    
    const organizer = await getOrganizerById(session.user.organizerId);
    
    if (!organizer) {
      return { status: 'error', error: { message: ['No se encontró ningún organizador'] } };
    }

    return { status: 'success', data: organizer };
  } catch {
    return { status: 'error', error: { message: ['Error al obtener la configuración del organizador'] } };
  }
}

export async function updateOrganizerSettings(formData: FormData): Promise<OrganizerSubmissionResult> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !session?.user?.organizerId) {
      return { status: 'error', error: { message: ['No se ha iniciado sesión'] } };
    }
    
    const name = formData.get('name') as string;
    
    if (!name) {
      return { status: 'error', error: { message: ['Falta el nombre del organizador'] } };
    }
    
    const updatedOrganizer = await updateOrganizerName(session.user.organizerId, name);

    revalidatePath('/dashboard/settings');
    
    return { status: 'success', data: updatedOrganizer };
  } catch {
    return { status: 'error', error: { message: ['Error al actualizar la configuración del organizador'] } };
  }
}
