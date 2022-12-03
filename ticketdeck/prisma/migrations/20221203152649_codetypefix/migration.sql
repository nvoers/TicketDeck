/*
  Warnings:

  - You are about to drop the column `typeId` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the `Code` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_typeId_fkey";

-- AlterTable
ALTER TABLE "ticket" DROP COLUMN "typeId",
ADD COLUMN     "type" TEXT NOT NULL;

-- DropTable
DROP TABLE "Code";
