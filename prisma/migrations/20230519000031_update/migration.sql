/*
  Warnings:

  - You are about to drop the column `assignedTo` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the `_AuthUserToTicket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AuthUserToTicket" DROP CONSTRAINT "_AuthUserToTicket_A_fkey";

-- DropForeignKey
ALTER TABLE "_AuthUserToTicket" DROP CONSTRAINT "_AuthUserToTicket_B_fkey";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "assignedTo";

-- DropTable
DROP TABLE "_AuthUserToTicket";

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
