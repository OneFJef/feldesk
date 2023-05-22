/*
  Warnings:

  - You are about to drop the column `authUserId` on the `Ticket` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_authUserId_fkey";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "authUserId";

-- CreateTable
CREATE TABLE "UserOnTicket" (
    "authUserId" STRING NOT NULL,
    "ticketId" INT4 NOT NULL,

    CONSTRAINT "UserOnTicket_pkey" PRIMARY KEY ("authUserId","ticketId")
);

-- AddForeignKey
ALTER TABLE "UserOnTicket" ADD CONSTRAINT "UserOnTicket_authUserId_fkey" FOREIGN KEY ("authUserId") REFERENCES "auth_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnTicket" ADD CONSTRAINT "UserOnTicket_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
