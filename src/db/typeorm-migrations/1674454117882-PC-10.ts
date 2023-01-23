import type { MigrationInterface, QueryRunner } from "typeorm";

export class PC101674454117882 implements MigrationInterface {
    name = 'PC101674454117882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "depot_carrier" ADD CONSTRAINT "UQ_333b5fef468c959c02ecc340017" UNIQUE ("carrierId", "depotId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "depot_carrier" DROP CONSTRAINT "UQ_333b5fef468c959c02ecc340017"`);
    }

}
