/*
  Warnings:

  - Added the required column `organizationLat` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationLng` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationLat` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationLng` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationName` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "organizationLat" DECIMAL(8,6) NOT NULL,
ADD COLUMN     "organizationLng" DECIMAL(9,6) NOT NULL;

-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "organizationLat" DECIMAL(8,6) NOT NULL,
ADD COLUMN     "organizationLng" DECIMAL(9,6) NOT NULL,
ADD COLUMN     "organizationName" TEXT NOT NULL;
