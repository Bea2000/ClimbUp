-- CreateEnum
CREATE TYPE "CompetitionStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'FINISHED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ClimbingGrade" AS ENUM ('FRENCH', 'YOSEMITE', 'V', 'ENGLISH', 'UIAA', 'ICE', 'AUSTRALIAN');

-- CreateEnum
CREATE TYPE "ParticipantStatus" AS ENUM ('CONFIRMED', 'PENDING', 'REJECTED');

-- CreateTable
CREATE TABLE "Competition" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "organizerId" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3),
    "basesPath" TEXT,
    "levelType" "ClimbingGrade" NOT NULL,
    "registerFormSettings" JSONB,
    "status" "CompetitionStatus" NOT NULL DEFAULT 'NOT_STARTED',

    CONSTRAINT "Competition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Problem" (
    "id" SERIAL NOT NULL,
    "level" TEXT NOT NULL,
    "name" TEXT,
    "maxPoints" INTEGER NOT NULL,
    "attempts" INTEGER NOT NULL,
    "discountPerAttempt" INTEGER NOT NULL,
    "competitionId" INTEGER NOT NULL,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Judge" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "organizerId" INTEGER NOT NULL,

    CONSTRAINT "Judge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipantCompetition" (
    "id" SERIAL NOT NULL,
    "participantId" INTEGER NOT NULL,
    "competitionId" INTEGER NOT NULL,
    "finalScore" INTEGER,
    "category" TEXT,
    "userInformation" JSONB,
    "status" "ParticipantStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "ParticipantCompetition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipantProblem" (
    "id" SERIAL NOT NULL,
    "problemId" INTEGER NOT NULL,
    "participantId" INTEGER NOT NULL,
    "participantCompetitionId" INTEGER NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "points" INTEGER,

    CONSTRAINT "ParticipantProblem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organizer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Organizer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "rut" TEXT NOT NULL,
    "isSuperAdmin" BOOLEAN NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "organizerId" INTEGER NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_JudgeCompetitions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_JudgeCompetitions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_JudgeProblems" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_JudgeProblems_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Judge_email_key" ON "Judge"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_name_key" ON "Organizer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_rut_key" ON "Admin"("rut");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE INDEX "_JudgeCompetitions_B_index" ON "_JudgeCompetitions"("B");

-- CreateIndex
CREATE INDEX "_JudgeProblems_B_index" ON "_JudgeProblems"("B");

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Judge" ADD CONSTRAINT "Judge_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantCompetition" ADD CONSTRAINT "ParticipantCompetition_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantCompetition" ADD CONSTRAINT "ParticipantCompetition_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantProblem" ADD CONSTRAINT "ParticipantProblem_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantProblem" ADD CONSTRAINT "ParticipantProblem_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantProblem" ADD CONSTRAINT "ParticipantProblem_participantCompetitionId_fkey" FOREIGN KEY ("participantCompetitionId") REFERENCES "ParticipantCompetition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JudgeCompetitions" ADD CONSTRAINT "_JudgeCompetitions_A_fkey" FOREIGN KEY ("A") REFERENCES "Competition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JudgeCompetitions" ADD CONSTRAINT "_JudgeCompetitions_B_fkey" FOREIGN KEY ("B") REFERENCES "Judge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JudgeProblems" ADD CONSTRAINT "_JudgeProblems_A_fkey" FOREIGN KEY ("A") REFERENCES "Judge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JudgeProblems" ADD CONSTRAINT "_JudgeProblems_B_fkey" FOREIGN KEY ("B") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
