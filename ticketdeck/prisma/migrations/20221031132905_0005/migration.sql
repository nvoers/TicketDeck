/*
  Warnings:

  - You are about to drop the column `city` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the column `event` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the column `venue` on the `ticket` table. All the data in the column will be lost.
  - Added the required column `code` to the `ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `ticket` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "event" TEXT NOT NULL DEFAULT 'Unknown',
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "city" TEXT NOT NULL DEFAULT 'Unknown',
    "venue" TEXT NOT NULL DEFAULT 'Unknown'
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ticket" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    CONSTRAINT "ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ticket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ticket" ("id", "userId") SELECT "id", "userId" FROM "ticket";
DROP TABLE "ticket";
ALTER TABLE "new_ticket" RENAME TO "ticket";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
