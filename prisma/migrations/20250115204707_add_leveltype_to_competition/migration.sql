/*
  Warnings:

  - Added the required column `levelType` to the `Competition` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ClimbingGrade" AS ENUM ('FRENCH', 'YOSEMITE', 'V', 'ENGLISH', 'UIAA', 'ICE', 'AUSTRALIAN');

-- AlterTable
ALTER TABLE "Competition" ADD COLUMN     "levelType" "ClimbingGrade" NOT NULL;

-- AlterTable
ALTER TABLE "Problem" ALTER COLUMN "level" SET DATA TYPE TEXT;
