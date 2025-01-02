import { SubmissionResult } from '@conform-to/react';

import prisma from '@/lib/db/prisma';

export async function getAdminsByOrganizerForUserId(organizerId: number, userId: number) {
  return prisma.admin.findMany({
    where: {
      organizerId,
      userId: {
        not: userId,
      },
    },
    include: {
      user: true,
    },
  });
} 

export async function deleteAdminById(adminId: number) : Promise<SubmissionResult> {
  try {
    const adminToDelete = await prisma.admin.findUnique({
      where: { id: adminId },
    });

    if (!adminToDelete) {
      throw new Error('Administrador no encontrado');
    }

    await prisma.$transaction([
      prisma.admin.delete({
        where: { id: adminId },
      }),
      prisma.user.delete({
        where: { id: adminToDelete.userId },
      }),
    ]);

    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error: { message: [`Error al eliminar administrador: ${error}`] } };
  }
}
