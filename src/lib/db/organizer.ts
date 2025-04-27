import prisma from "./prisma";

export async function getOrganizerNameById(organizerId: number) {
  const organizer = await prisma.organizer.findUnique({
    where: { id: organizerId },
  });
  return organizer?.name;
}

export async function createOrganizer(data: CreateOrganizerData) {
  return await prisma.organizer.create({
    data,
  });
}

export async function getOrganizerByName(name: string) {
  return await prisma.organizer.findUnique({
    where: { name },
  });
}
