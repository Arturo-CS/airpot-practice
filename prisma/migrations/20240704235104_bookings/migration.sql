/*
  Warnings:

  - You are about to drop the column `returnFly` on the `Bookings` table. All the data in the column will be lost.
  - You are about to drop the column `roundFly` on the `Bookings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "returnFly",
DROP COLUMN "roundFly",
ADD COLUMN     "returnFlyId" INTEGER,
ADD COLUMN     "roundFlyId" INTEGER;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_roundFlyId_fkey" FOREIGN KEY ("roundFlyId") REFERENCES "Fly"("flyId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_returnFlyId_fkey" FOREIGN KEY ("returnFlyId") REFERENCES "Fly"("flyId") ON DELETE SET NULL ON UPDATE CASCADE;
