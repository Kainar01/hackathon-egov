import type { MigrationInterface, QueryRunner } from "typeorm";

export class PC101674453975042 implements MigrationInterface {
    name = 'PC101674453975042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "buyer" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "buyerId" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "depotId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "UQ_4f3f1b97db4d946233a9dc41360" UNIQUE ("userId", "depotId"), CONSTRAINT "PK_35e509f06d82823d0bb7a280695" PRIMARY KEY ("buyerId"))`);
        await queryRunner.query(`ALTER TABLE "buyer_request" ADD "buyerId" integer`);
        await queryRunner.query(`ALTER TABLE "buyer" ADD CONSTRAINT "FK_a691e528211f01a4e95e9c9fb14" FOREIGN KEY ("depotId") REFERENCES "depot"("depotId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buyer" ADD CONSTRAINT "FK_7039f540d4ac0628debf478d0a8" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buyer_request" ADD CONSTRAINT "FK_1b7fad83f4be5bef6b50076a137" FOREIGN KEY ("buyerId") REFERENCES "buyer"("buyerId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buyer_request" DROP CONSTRAINT "FK_1b7fad83f4be5bef6b50076a137"`);
        await queryRunner.query(`ALTER TABLE "buyer" DROP CONSTRAINT "FK_7039f540d4ac0628debf478d0a8"`);
        await queryRunner.query(`ALTER TABLE "buyer" DROP CONSTRAINT "FK_a691e528211f01a4e95e9c9fb14"`);
        await queryRunner.query(`ALTER TABLE "buyer_request" DROP COLUMN "buyerId"`);
        await queryRunner.query(`DROP TABLE "buyer"`);
    }

}
