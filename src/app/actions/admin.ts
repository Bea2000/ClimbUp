'use server';

import { SubmissionResult } from "@conform-to/react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";


import { authOptions } from "@/lib/auth";
import { createNewAdmin, deleteAdminById, getAdminByEmailOrRut, getAdminById } from "@/lib/db/admin";

export async function createAdmin(_prevState: unknown, formData: FormData): Promise<SubmissionResult> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { status: 'error', error: { message: ['No se ha iniciado sesión'] } };
  }

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const rut = formData.get('rut') as string;
  const isSuperAdmin = formData.get('isSuperAdmin') === 'on';
  const organizerId = session?.user.organizerId;

  try {
    const existingUser = await getAdminByEmailOrRut(email, rut);

    if (existingUser) {
      return { 
        status: 'error', 
        error: { 
          message: [
            existingUser.email === email ? 
              'El email ya está registrado' : 
              'El RUT ya está registrado',
          ], 
        }, 
      };
    }

    await createNewAdmin({
      name,
      email,
      password,
      rut,
      isSuperAdmin,
      organizerId,
    });

    return { status: 'success' };
  } catch (error) {
    return { 
      status: 'error', 
      error: { 
        message: [`Error al crear el administrador: ${error as string}`], 
      }, 
    };
  }
} 

export async function deleteAdmin(adminId: number): Promise<SubmissionResult> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  const currentAdmin = await getAdminById(parseInt(session.user.id));

  if (!currentAdmin?.isSuperAdmin) {
    return { status: 'error', error: { message: ['No tienes permisos para eliminar administradores'] } };
  }

  const adminToDelete = await getAdminById(adminId);

  if (!adminToDelete) {
    return { status: 'error', error: { message: ['Administrador no encontrado'] } };
  }

  return await deleteAdminById(adminId);
} 
