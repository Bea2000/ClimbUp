import { Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

import { signupSchema } from '@/app/signup/schemas/signupSchema';
import prisma from '@/lib/db/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.password || !body.rut || !body.organizerName) {
      return NextResponse.json(
        { message: 'Faltan campos requeridos' },
        { status: 400 },
      );
    }

    const { name, email, password, rut, organizerName } = signupSchema.parse(body);

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { rut },
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'El email o RUT ya está registrado' },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingOrganizer = await prisma.organizer.findFirst({
      where: {
        name: organizerName,
      },
    });

    if (existingOrganizer) {
      return NextResponse.json(
        { message: 'El nombre del organizador ya está registrado' },
        { status: 400 },
      );
    }

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
    return NextResponse.json(
      { message: `Error al crear usuario: ${error}` },
      { status: 500 },
    );
  }
} 
