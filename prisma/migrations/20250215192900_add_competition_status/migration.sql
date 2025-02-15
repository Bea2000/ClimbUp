-- CreateEnum
CREATE TYPE "CompetitionStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'FINISHED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Competition" ADD COLUMN     "status" "CompetitionStatus" NOT NULL DEFAULT 'NOT_STARTED';
