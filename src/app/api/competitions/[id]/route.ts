import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    const competition = await prisma.competition.findUnique({
      where: {
        id: id,
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
