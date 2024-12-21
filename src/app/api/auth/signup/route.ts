import { Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

import { signupSchema } from '@/app/signup/schemas/signupSchema';
import prisma from '@/lib/db/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, rut, organizerName } = signupSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'El email ya está registrado' },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const organizer = await prisma.organizer.create({
      data: {
        name: organizerName,
      },
    });

    
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role: Role.ADMIN,
        rut,
      },
    });

    await prisma.admin.create({
      data: {
        password: hashedPassword,
        isSuperAdmin: true,
        user: {
          connect: { id: user.id },
        },
        organizer: {
          connect: { id: organizer.id },
        },
      },
    });

    return NextResponse.json(
      { message: 'Usuario creado exitosamente' },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error en registro:', error);
    return NextResponse.json(
      { message: 'Error al crear usuario' },
      { status: 500 },
    );
  }
} 
