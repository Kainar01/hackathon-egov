/*
  Warnings:

  - You are about to drop the column `organizationLat` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `organizationLng` on the `Delivery` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Delivery" DROP COLUMN "organizationLat",
DROP COLUMN "organizationLng";
