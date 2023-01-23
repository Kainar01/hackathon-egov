import type { MigrationInterface, QueryRunner } from "typeorm";

export class PC4Depot1674386829256 implements MigrationInterface {
    name = 'PC4Depot1674386829256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "depot" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "depotId" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "cityId" integer NOT NULL, "addressId" integer, "name" character varying NOT NULL, "buyerFee" numeric, "lat" numeric(8,6) NOT NULL, "lng" numeric(9,6) NOT NULL, "pickup" boolean NOT NULL DEFAULT false, "order" integer, CONSTRAINT "PK_39aae7fbb16907c4c8f734d8b9e" PRIMARY KEY ("depotId"))`);
        await queryRunner.query(`ALTER TABLE "depot" ADD CONSTRAINT "FK_502337aa631a3d9227836f358f4" FOREIGN KEY ("cityId") REFERENCES "city"("cityId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "depot" DROP CONSTRAINT "FK_502337aa631a3d9227836f358f4"`);
        await queryRunner.query(`DROP TABLE "depot"`);
    }

}
