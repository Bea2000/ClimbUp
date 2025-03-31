import prisma from "./prisma";

export async function getOrganizerNameById(organizerId: number) {
  const organizer = await prisma.organizer.findUnique({
    where: { id: organizerId },
  });
  return organizer?.name;
}
