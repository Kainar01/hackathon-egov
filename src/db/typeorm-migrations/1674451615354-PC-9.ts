import type { MigrationInterface, QueryRunner } from "typeorm";

export class PC91674451615354 implements MigrationInterface {
    name = 'PC91674451615354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "depot_carrier" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "depotCarrierId" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "carrierId" integer NOT NULL, "depotId" integer NOT NULL, CONSTRAINT "PK_f99cbcfde09cd115ac9cc4320b7" PRIMARY KEY ("depotCarrierId"))`);
        await queryRunner.query(`ALTER TABLE "depot_carrier" ADD CONSTRAINT "FK_0af602853230554b09a4478130a" FOREIGN KEY ("depotId") REFERENCES "depot"("depotId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
        await queryRunner.query(`ALTER TABLE "depot_carrier" ADD CONSTRAINT "FK_d00e1931de61da6292e0f1e159c" FOREIGN KEY ("carrierId") REFERENCES "carrier"("carrierId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "depot_carrier" DROP CONSTRAINT "FK_d00e1931de61da6292e0f1e159c"`);
        await queryRunner.query(`ALTER TABLE "depot_carrier" DROP CONSTRAINT "FK_0af602853230554b09a4478130a"`);
        await queryRunner.query(`DROP TABLE "depot_carrier"`);
    }

}
