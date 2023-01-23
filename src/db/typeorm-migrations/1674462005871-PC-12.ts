import type { MigrationInterface, QueryRunner } from "typeorm";

export class PC121674462005871 implements MigrationInterface {
    name = 'PC121674462005871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "depot" DROP CONSTRAINT "FK_502337aa631a3d9227836f358f4"`);
        await queryRunner.query(`CREATE TABLE "address" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "addressId" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "cityId" integer NOT NULL, "address" text NOT NULL, "phone" character varying, "zip" character varying, "lat" numeric(8,6), "lng" numeric(9,6), CONSTRAINT "PK_ffc3e4d1012ae997d42d8ebe398" PRIMARY KEY ("addressId"))`);
        await queryRunner.query(`ALTER TABLE "depot" DROP COLUMN "cityId"`);
        await queryRunner.query(`ALTER TABLE "depot" ADD "countryId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "depot" ALTER COLUMN "addressId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_3624b3085165071df70276a4000" FOREIGN KEY ("cityId") REFERENCES "city"("cityId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "depot" ADD CONSTRAINT "FK_eba847e2194393069e59fa2bc36" FOREIGN KEY ("countryId") REFERENCES "country"("countryId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "depot" ADD CONSTRAINT "FK_282f29935450b8110cb472b6eb3" FOREIGN KEY ("addressId") REFERENCES "address"("addressId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "depot" DROP CONSTRAINT "FK_282f29935450b8110cb472b6eb3"`);
        await queryRunner.query(`ALTER TABLE "depot" DROP CONSTRAINT "FK_eba847e2194393069e59fa2bc36"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_3624b3085165071df70276a4000"`);
        await queryRunner.query(`ALTER TABLE "depot" ALTER COLUMN "addressId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "depot" DROP COLUMN "countryId"`);
        await queryRunner.query(`ALTER TABLE "depot" ADD "cityId" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`ALTER TABLE "depot" ADD CONSTRAINT "FK_502337aa631a3d9227836f358f4" FOREIGN KEY ("cityId") REFERENCES "city"("cityId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
