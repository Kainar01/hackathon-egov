import type { MigrationInterface, QueryRunner } from "typeorm";

export class PC151674564925858 implements MigrationInterface {
    name = 'PC151674564925858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parcel" DROP COLUMN "isAddedByStaff"`);
        await queryRunner.query(`ALTER TABLE "parcel" ADD "creatorStaffId" integer`);
        await queryRunner.query(`ALTER TABLE "parcel" ADD CONSTRAINT "FK_f0dca9b969ada44c3e239ed1cef" FOREIGN KEY ("creatorStaffId") REFERENCES "depot_staff"("depotStaffId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parcel" DROP CONSTRAINT "FK_f0dca9b969ada44c3e239ed1cef"`);
        await queryRunner.query(`ALTER TABLE "parcel" DROP COLUMN "creatorStaffId"`);
        await queryRunner.query(`ALTER TABLE "parcel" ADD "isAddedByStaff" boolean NOT NULL DEFAULT false`);
    }

}
