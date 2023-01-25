import type { MigrationInterface, QueryRunner } from "typeorm";

export class PC151674615716230 implements MigrationInterface {
    name = 'PC151674615716230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_c5f78ad8f82e492c25d07f047a5" UNIQUE ("code")`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."code" IS 'Unique code that will be used in user address'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "user"."code" IS 'Unique code that will be used in user address'`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_c5f78ad8f82e492c25d07f047a5"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "code"`);
    }

}
