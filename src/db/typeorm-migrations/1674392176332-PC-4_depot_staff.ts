import type { MigrationInterface, QueryRunner } from "typeorm";

export class PC4DepotStaff1674392176332 implements MigrationInterface {
    name = 'PC4DepotStaff1674392176332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "depot_staff" DROP COLUMN "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "depot_staff" ADD "name" character varying NOT NULL`);
    }

}
