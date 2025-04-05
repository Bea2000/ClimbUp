import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

import { signupSchema } from '@/app/signup/schemas/signupSchema';
import { getAdminByEmailOrRut, createNewAdmin } from '@/lib/db/admin';
import { createOrganizer, getOrganizerByName } from '@/lib/db/organizer';
import { normalizeRut } from '@/utils/rut';

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
    const normalizedRut = normalizeRut(rut);

    const existingUser = await getAdminByEmailOrRut(email, rut);

    if (existingUser) {
      return NextResponse.json(
        { message: 'El email o RUT ya está registrado' },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingOrganizer = await getOrganizerByName(organizerName);

    if (existingOrganizer) {
      return NextResponse.json(
        { message: 'El nombre del organizador ya está registrado' },
        { status: 400 },
      );
    }

    const organizer = await createOrganizer({ name: organizerName });
    
    await createNewAdmin({
      name,
      email,
      password: hashedPassword,
      rut: normalizedRut,
      organizerId: organizer.id,
      isSuperAdmin: true,
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
