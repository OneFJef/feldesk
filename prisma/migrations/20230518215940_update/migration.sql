/*
  Warnings:

  - You are about to drop the `UserOnTicket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserOnTicket" DROP CONSTRAINT "UserOnTicket_authUserId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnTicket" DROP CONSTRAINT "UserOnTicket_ticketId_fkey";

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "assignedTo" STRING;
ALTER TABLE "Ticket" ADD COLUMN     "authUserId" STRING;

-- DropTable
DROP TABLE "UserOnTicket";

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_authUserId_fkey" FOREIGN KEY ("authUserId") REFERENCES "auth_user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
