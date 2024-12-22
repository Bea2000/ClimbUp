import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Convertir los strings de fecha y hora a un objeto Date
    const dateStr = body.date;
    const timeStr = body.startTime;
    const startTime = new Date(`${dateStr}T${timeStr}`);

    const competition = await prisma.competition.create({
      data: {
        code: body.code,
        name: body.name,
        location: body.location,
        date: new Date(body.date),
        duration: parseInt(body.duration),
        startTime: startTime,
        // Por ahora, hardcodeamos el organizerId como 1
        // TODO: Implementar autenticación y obtener el organizerId del usuario actual
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
