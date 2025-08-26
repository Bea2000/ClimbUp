import { Prisma } from "@prisma/client";

import prisma from "./prisma";

export async function getSectorsByCompetitionId(competitionId: number) {
  return await prisma.sector.findMany({
    where: { competitionId },
    orderBy: { name: "asc" },
  });
}

export async function createNewSector(data: Prisma.SectorCreateInput) {
  return await prisma.sector.create({
    data,
  });
}

export async function addProblemToSector(problemId: number, sectorId: number) {
  return await prisma.problem.update({
    where: { id: problemId },
    data: {
      sectorId,
    },
  });
}

export async function removeProblemFromSector(problemId: number) {
  return await prisma.problem.update({
    where: { id: problemId },
    data: {
      sectorId: null,
    },
  });
}

export async function getProblemsWithSectorsByCompetitionId(competitionId: number) {
  return await prisma.problem.findMany({
    where: { competitionId },
    include: {
      sector: true,
    },
  });
}

export async function deleteSectorById(sectorId: number) {
  // First remove all problems from this sector
  await prisma.problem.updateMany({
    where: { sectorId },
    data: { sectorId: null },
  });
  
  // Then delete the sector
  return await prisma.sector.delete({
    where: { id: sectorId },
  });
}
