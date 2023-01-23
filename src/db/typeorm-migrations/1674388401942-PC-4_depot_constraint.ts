import type { MigrationInterface, QueryRunner } from "typeorm";

export class PC4DepotConstraint1674388401942 implements MigrationInterface {
    name = 'PC4DepotConstraint1674388401942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "depot" RENAME COLUMN "pickup" TO "allowOrder"`);
        await queryRunner.query(`ALTER TABLE "depot" ADD CONSTRAINT "CHK_1881c542f0be2d26bb2b47484b" CHECK ("allowOrder" IS FALSE OR "buyerFee" IS NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "depot" DROP CONSTRAINT "CHK_1881c542f0be2d26bb2b47484b"`);
        await queryRunner.query(`ALTER TABLE "depot" RENAME COLUMN "allowOrder" TO "pickup"`);
    }

}
