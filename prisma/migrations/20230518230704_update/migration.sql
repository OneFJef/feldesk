/*
  Warnings:

  - You are about to drop the `UserOnTicket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserOnTicket" DROP CONSTRAINT "UserOnTicket_authUserId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnTicket" DROP CONSTRAINT "UserOnTicket_ticketId_fkey";

-- DropTable
DROP TABLE "UserOnTicket";

-- CreateTable
CREATE TABLE "_AuthUserToTicket" (
    "A" STRING NOT NULL,
    "B" INT4 NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AuthUserToTicket_AB_unique" ON "_AuthUserToTicket"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthUserToTicket_B_index" ON "_AuthUserToTicket"("B");

-- AddForeignKey
ALTER TABLE "_AuthUserToTicket" ADD CONSTRAINT "_AuthUserToTicket_A_fkey" FOREIGN KEY ("A") REFERENCES "auth_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthUserToTicket" ADD CONSTRAINT "_AuthUserToTicket_B_fkey" FOREIGN KEY ("B") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;
