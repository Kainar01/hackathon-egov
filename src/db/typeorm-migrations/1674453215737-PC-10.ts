import type { MigrationInterface, QueryRunner } from "typeorm";

export class PC101674453215737 implements MigrationInterface {
    name = 'PC101674453215737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."buyer_request_status_enum" AS ENUM('pending', 'canceled', 'processing', 'completed')`);
        await queryRunner.query(`CREATE TABLE "buyer_request" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "buyerRequestId" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "depotId" integer NOT NULL, "userId" integer NOT NULL, "status" "public"."buyer_request_status_enum" NOT NULL, "comment" text, "total" numeric(10,2) NOT NULL, CONSTRAINT "CHK_91529cd31acbc53ff54b8ef586" CHECK ("total" >= 0), CONSTRAINT "PK_0936e6d016850bc15724addee8b" PRIMARY KEY ("buyerRequestId"))`);
        await queryRunner.query(`CREATE TABLE "buyer_request_item" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "buyerRequestItemId" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "buyerRequestId" integer NOT NULL, "title" character varying NOT NULL, "link" text NOT NULL, "color" character varying, "size" character varying, "price" numeric(10,2) NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "UQ_33b10140e8564293ec906a9a247" UNIQUE ("buyerRequestId", "title"), CONSTRAINT "CHK_ffd8aa68e46e5af3dec162e27e" CHECK ("quantity" > 0), CONSTRAINT "CHK_56bb6aa78c176f745bd895a4e8" CHECK ("price" >= 0), CONSTRAINT "PK_47453f79fbd0308b6332818da00" PRIMARY KEY ("buyerRequestItemId"))`);
        await queryRunner.query(`ALTER TABLE "buyer_request" ADD CONSTRAINT "FK_1d0fdea7940f162458199501081" FOREIGN KEY ("depotId") REFERENCES "depot"("depotId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buyer_request" ADD CONSTRAINT "FK_0feadb2e865a466542c9d077063" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buyer_request_item" ADD CONSTRAINT "FK_56baaa37763ba92a60da82917c8" FOREIGN KEY ("buyerRequestId") REFERENCES "buyer_request"("buyerRequestId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buyer_request_item" DROP CONSTRAINT "FK_56baaa37763ba92a60da82917c8"`);
        await queryRunner.query(`ALTER TABLE "buyer_request" DROP CONSTRAINT "FK_0feadb2e865a466542c9d077063"`);
        await queryRunner.query(`ALTER TABLE "buyer_request" DROP CONSTRAINT "FK_1d0fdea7940f162458199501081"`);
        await queryRunner.query(`DROP TABLE "buyer_request_item"`);
        await queryRunner.query(`DROP TABLE "buyer_request"`);
        await queryRunner.query(`DROP TYPE "public"."buyer_request_status_enum"`);
    }

}
