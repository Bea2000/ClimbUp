'use server';

import { SubmissionResult } from "@conform-to/react";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { createNewCompetition, getCompetitionsByOrganizerName } from "@/lib/db/competition";

type SearchCompetitionResult = SubmissionResult & {
  data?: { 
    competitions: Array<{
      id: number;
      name: string;
      location: string;
      date: Date;
      code: string;
      organizerName: string;
    }>;
  };
};

export async function createCompetition(_prevState: unknown, formData: FormData) : Promise<SubmissionResult> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { status: 'error', error: { message: ['No se ha iniciado sesión'] } };
  }
  
  const name = formData.get('name') as string;
  const location = formData.get('location') as string;
  const date = new Date(formData.get('date') as string);
  const duration = parseInt(formData.get('duration') as string);
  const code = formData.get('code') as string;
  const organizerId = session?.user.organizerId;

  const competitionData = { name, location, date, duration, code, organizerId };
  
  try {
    await createNewCompetition(competitionData);
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error: { message: [`Error al crear la competencia: ${error as string}`] } };
  }
}

export async function searchCompetition(_prevState: unknown, formData: FormData): Promise<SearchCompetitionResult> {
  const organizerName = formData.get('organizerName') as string;
  
  try {
    const competitions = await getCompetitionsByOrganizerName(organizerName);

    if (competitions.length === 0) {
      return { 
        status: 'error', 
        error: { message: ['No se encontraron competencias para este organizador'] }, 
      };
    }

    return { 
      status: 'success',
      data: { 
        competitions: competitions.map(comp => ({
          id: comp.id,
          name: comp.name,
          location: comp.location,
          date: comp.date,
          code: comp.code,
          organizerName: comp.organizer.name,
        })),
      }, 
    };
  } catch (error) {
    return { 
      status: 'error', 
      error: { message: [`Error al buscar las competencias: ${error as string}`] },
    };
  }
}
