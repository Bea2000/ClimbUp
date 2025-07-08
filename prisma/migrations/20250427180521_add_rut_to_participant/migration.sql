/*
  Warnings:

  - A unique constraint covering the columns `[rut]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rut` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "rut" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Participant_rut_key" ON "Participant"("rut");
