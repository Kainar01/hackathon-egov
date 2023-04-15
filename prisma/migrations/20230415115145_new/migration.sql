/*
  Warnings:

  - You are about to drop the column `phone` on the `Carrier` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Carrier` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Carrier` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lat` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `Carrier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `Carrier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Carrier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressId` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientCode` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `operatorCode` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressId` to the `UserRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `UserRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User.iin_unique";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "lat" DECIMAL(8,6) NOT NULL,
ADD COLUMN     "lng" DECIMAL(9,6) NOT NULL;

-- AlterTable
ALTER TABLE "Carrier" DROP COLUMN "phone",
DROP COLUMN "type",
ADD COLUMN     "lat" DECIMAL(8,6) NOT NULL,
ADD COLUMN     "lng" DECIMAL(9,6) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "addressId" INTEGER NOT NULL,
ADD COLUMN     "clientCode" TEXT NOT NULL,
ADD COLUMN     "deliveredAt" TIMESTAMP(3),
ADD COLUMN     "operatorCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT;

-- AlterTable
ALTER TABLE "UserRequest" ADD COLUMN     "addressId" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Carrier.userId_unique" ON "Carrier"("userId");

-- AddForeignKey
ALTER TABLE "UserRequest" ADD CONSTRAINT "UserRequest_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carrier" ADD CONSTRAINT "Carrier_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;
