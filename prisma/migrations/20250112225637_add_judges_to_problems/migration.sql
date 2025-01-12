-- DropIndex
DROP INDEX "Judge_userId_key";

-- CreateTable
CREATE TABLE "_JudgeToProblem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_JudgeToProblem_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_JudgeToProblem_B_index" ON "_JudgeToProblem"("B");

-- AddForeignKey
ALTER TABLE "_JudgeToProblem" ADD CONSTRAINT "_JudgeToProblem_A_fkey" FOREIGN KEY ("A") REFERENCES "Judge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JudgeToProblem" ADD CONSTRAINT "_JudgeToProblem_B_fkey" FOREIGN KEY ("B") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
