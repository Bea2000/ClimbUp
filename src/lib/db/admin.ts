import { SubmissionResult } from '@conform-to/react';

import prisma from '@/lib/db/prisma';
import { CreateAdminData } from '@/types/admin';

export async function getAdminByEmail(email: string) {
  return await prisma.admin.findFirst({
    where: {
      email,
    },
  });
}

export async function createNewAdmin(data: CreateAdminData) {
  return await prisma.admin.create({
    data: {
      ...data,
    },
  });
}

export async function getAdminById(id: number) {
  return await prisma.admin.findUnique({
    where: { id },
  });
}

export async function getAdminByEmailOrRut(email: string, rut: string) {
  return await prisma.admin.findFirst({
    where: {
      OR: [{ email }, { rut }],
    },
  });
}

export async function getAdminsByOrganizer(organizerId: number, userId: number) {
  return prisma.admin.findMany({
    where: {
      organizerId,
      id: {
        not: userId,
      },
    },
  });
} 

export async function deleteAdminById(adminId: number) : Promise<SubmissionResult> {
  try {
    await prisma.admin.delete({
      where: { id: adminId },
    });

    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error: { message: [`Error al eliminar administrador: ${error}`] } };
  }
}
