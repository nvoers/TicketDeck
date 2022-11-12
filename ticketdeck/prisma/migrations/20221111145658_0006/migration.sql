/*
  Warnings:

  - You are about to alter the column `userId` on the `ticket` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ticket" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "eventId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    CONSTRAINT "ticket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ticket" ("code", "eventId", "id", "userId") SELECT "code", "eventId", "id", "userId" FROM "ticket";
DROP TABLE "ticket";
ALTER TABLE "new_ticket" RENAME TO "ticket";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
