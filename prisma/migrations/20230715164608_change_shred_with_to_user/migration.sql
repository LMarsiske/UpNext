/*
  Warnings:

  - You are about to drop the column `shared_with` on the `list` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "list" DROP COLUMN "shared_with";

-- CreateTable
CREATE TABLE "_sharedLists" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_sharedLists_AB_unique" ON "_sharedLists"("A", "B");

-- CreateIndex
CREATE INDEX "_sharedLists_B_index" ON "_sharedLists"("B");

-- AddForeignKey
ALTER TABLE "_sharedLists" ADD CONSTRAINT "_sharedLists_A_fkey" FOREIGN KEY ("A") REFERENCES "list"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_sharedLists" ADD CONSTRAINT "_sharedLists_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
