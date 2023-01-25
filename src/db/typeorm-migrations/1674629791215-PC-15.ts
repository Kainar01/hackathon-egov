import type { MigrationInterface, QueryRunner } from "typeorm";

export class PC151674629791215 implements MigrationInterface {
    name = 'PC151674629791215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_6f668fb08a9935d1989c3da783"`);
        await queryRunner.query(`ALTER TABLE "parcel" RENAME COLUMN "parcelStatus" TO "status"`);
        await queryRunner.query(`ALTER TYPE "public"."parcel_parcelstatus_enum" RENAME TO "parcel_status_enum"`);
        await queryRunner.query(`CREATE INDEX "IDX_dd977adccc53bd3b144d5609d3" ON "parcel" ("status") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_dd977adccc53bd3b144d5609d3"`);
        await queryRunner.query(`ALTER TYPE "public"."parcel_status_enum" RENAME TO "parcel_parcelstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "parcel" RENAME COLUMN "status" TO "parcelStatus"`);
        await queryRunner.query(`CREATE INDEX "IDX_6f668fb08a9935d1989c3da783" ON "parcel" ("parcelStatus") `);
    }

}
