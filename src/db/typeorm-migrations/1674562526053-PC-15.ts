import type { MigrationInterface, QueryRunner } from "typeorm";

export class PC151674562526053 implements MigrationInterface {
    name = 'PC151674562526053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parcel" DROP CONSTRAINT "FK_f6f65a410a9fd230b4bb1976688"`);
        await queryRunner.query(`ALTER TABLE "parcel" DROP COLUMN "parcelStatusId"`);
        await queryRunner.query(`CREATE TYPE "public"."parcel_parcelstatus_enum" AS ENUM('registration_pending', 'need_manual_registration', 'registered', 'shipped', 'delivery_pending', 'on_delivery', 'delivered')`);
        await queryRunner.query(`ALTER TABLE "parcel" ADD "parcelStatus" "public"."parcel_parcelstatus_enum" NOT NULL DEFAULT 'registration_pending'`);
        await queryRunner.query(`ALTER TABLE "parcel" ADD "isAddedByStaff" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "parcel" ALTER COLUMN "total" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "parcel" ALTER COLUMN "buyerFee" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "parcel" ALTER COLUMN "weight" DROP NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_6f668fb08a9935d1989c3da783" ON "parcel" ("parcelStatus") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_6f668fb08a9935d1989c3da783"`);
        await queryRunner.query(`ALTER TABLE "parcel" ALTER COLUMN "weight" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "parcel" ALTER COLUMN "buyerFee" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "parcel" ALTER COLUMN "total" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "parcel" DROP COLUMN "isAddedByStaff"`);
        await queryRunner.query(`ALTER TABLE "parcel" DROP COLUMN "parcelStatus"`);
        await queryRunner.query(`DROP TYPE "public"."parcel_parcelstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "parcel" ADD "parcelStatusId" integer`);
        await queryRunner.query(`ALTER TABLE "parcel" ADD CONSTRAINT "FK_f6f65a410a9fd230b4bb1976688" FOREIGN KEY ("parcelStatusId") REFERENCES "parcel_status"("parcelStatusId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
    }

}
