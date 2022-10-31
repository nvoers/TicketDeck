/*
  Warnings:

  - You are about to drop the column `organiser` on the `ticket` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ticket" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "event" TEXT NOT NULL DEFAULT 'Unknown',
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "city" TEXT NOT NULL DEFAULT 'Unknown',
    "venue" TEXT NOT NULL DEFAULT 'Unknown',
    "userId" TEXT NOT NULL,
    CONSTRAINT "ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ticket" ("city", "date", "event", "id", "userId", "venue") SELECT "city", "date", "event", "id", "userId", "venue" FROM "ticket";
DROP TABLE "ticket";
ALTER TABLE "new_ticket" RENAME TO "ticket";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;