import type { MigrationInterface, QueryRunner } from "typeorm";

export class PC131674543601800 implements MigrationInterface {
    name = 'PC131674543601800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "depot" DROP CONSTRAINT "FK_282f29935450b8110cb472b6eb3"`);
        await queryRunner.query(`ALTER TABLE "depot" DROP COLUMN "addressId"`);
        await queryRunner.query(`ALTER TABLE "depot" DROP COLUMN "order"`);
        await queryRunner.query(`ALTER TABLE "depot" ADD "cityId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "depot" ADD "address" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "depot" ADD "phone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "depot" ADD "zip" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "depot" ADD CONSTRAINT "FK_502337aa631a3d9227836f358f4" FOREIGN KEY ("cityId") REFERENCES "city"("cityId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "depot" DROP CONSTRAINT "FK_502337aa631a3d9227836f358f4"`);
        await queryRunner.query(`ALTER TABLE "depot" DROP COLUMN "zip"`);
        await queryRunner.query(`ALTER TABLE "depot" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "depot" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "depot" DROP COLUMN "cityId"`);
        await queryRunner.query(`ALTER TABLE "depot" ADD "order" integer`);
        await queryRunner.query(`ALTER TABLE "depot" ADD "addressId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "depot" ADD CONSTRAINT "FK_282f29935450b8110cb472b6eb3" FOREIGN KEY ("addressId") REFERENCES "address"("addressId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
    }

}
