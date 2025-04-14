-- CreateEnum
CREATE TYPE "ParticipantStatus" AS ENUM ('PENDING', 'CONFIRMED', 'REJECTED');

-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "status" "ParticipantStatus" NOT NULL DEFAULT 'PENDING';
