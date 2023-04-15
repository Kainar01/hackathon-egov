/*
  Warnings:

  - You are about to drop the column `addressId` on the `UserRequest` table. All the data in the column will be lost.
  - You are about to drop the column `trustedUserId` on the `UserRequest` table. All the data in the column will be lost.
  - Added the required column `phone` to the `Delivery` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserRequest" DROP CONSTRAINT "UserRequest_addressId_fkey";

-- DropForeignKey
ALTER TABLE "UserRequest" DROP CONSTRAINT "UserRequest_trustedUserId_fkey";

-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserRequest" DROP COLUMN "addressId",
DROP COLUMN "trustedUserId";
