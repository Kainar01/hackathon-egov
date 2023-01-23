import type { MigrationInterface, QueryRunner } from "typeorm";

export class PC81674408722825 implements MigrationInterface {
    name = 'PC81674408722825'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipping" DROP CONSTRAINT "CHK_355b1faf47d50ff96def7dc655"`);
        await queryRunner.query(`ALTER TABLE "shipping" ADD CONSTRAINT "CHK_7ba5d2e600ad7d8c8974ed2f5c" CHECK ("weight" > 0)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipping" DROP CONSTRAINT "CHK_7ba5d2e600ad7d8c8974ed2f5c"`);
        await queryRunner.query(`ALTER TABLE "shipping" ADD CONSTRAINT "CHK_355b1faf47d50ff96def7dc655" CHECK ((weight >= (0)::numeric))`);
    }

}
