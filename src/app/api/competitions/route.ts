import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const competition = await prisma.competition.create({
      data: {
        code: body.code,
        name: body.name,
        location: body.location,
        date: new Date(body.date),
        duration: parseInt(body.duration),
        startTime: null, // startTime will be set later
        // For now, we are hardcoding the organizerId as 1
        // TODO: Implement authentication and get the organizerId of the current user
        organizerId: 1,
      },
    });

    return NextResponse.json(competition, { status: 201 });
  } catch (error) {
    console.error('Error creating competition:', error);
    return NextResponse.json(
      { error: 'Error creating competition' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Por ahora, hardcodeamos el organizerId como 1
    // TODO: Implementar autenticación y obtener el organizerId del usuario actual
    const organizerId = 1;

    const competitions = await prisma.competition.findMany({
      where: {
        organizerId: organizerId,
      },
      orderBy: {
        date: 'asc',
      },
    });

    return NextResponse.json(competitions);
  } catch (error) {
    console.error('Error al obtener las competencias:', error);
    return NextResponse.json(
      { error: 'Error al obtener las competencias' },
      { status: 500 }
    );
  }
}
