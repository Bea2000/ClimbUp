import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const competitionId = parseInt(id);
    
    const competition = await prisma.competition.findUnique({
      where: {
        id: competitionId,
      },
    });

    if (!competition) {
      return NextResponse.json(
        { error: 'Competencia no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(competition);
  } catch (error) {
    console.error('Error al obtener la competencia:', error);
    return NextResponse.json(
      { error: 'Error al obtener la competencia' },
      { status: 500 }
    );
  }
}
