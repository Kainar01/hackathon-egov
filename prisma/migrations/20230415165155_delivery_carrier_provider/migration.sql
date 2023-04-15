/*
  Warnings:

  - Added the required column `carrierProviderId` to the `Delivery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "carrierProviderId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_carrierProviderId_fkey" FOREIGN KEY ("carrierProviderId") REFERENCES "CarrierProvider"("id") ON DELETE CASCADE ON UPDATE CASCADE;
