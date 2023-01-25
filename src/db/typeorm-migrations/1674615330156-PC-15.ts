import type { MigrationInterface, QueryRunner } from "typeorm";

export class PC151674615330156 implements MigrationInterface {
    name = 'PC151674615330156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "depot_staff" DROP CONSTRAINT "FK_2285a698083eafb9a55bce81de8"`);
        await queryRunner.query(`ALTER TABLE "buyer_request" DROP CONSTRAINT "FK_1b7fad83f4be5bef6b50076a137"`);
        await queryRunner.query(`ALTER TABLE "buyer_request" RENAME COLUMN "buyerId" TO "buyerStaffId"`);
        await queryRunner.query(`CREATE TYPE "public"."depot_staff_role_role_enum" AS ENUM('manager', 'admin', 'buyer')`);
        await queryRunner.query(`CREATE TABLE "depot_staff_role" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "depotStaffRoleId" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "depotStaffId" integer NOT NULL, "depotId" integer NOT NULL, "role" "public"."depot_staff_role_role_enum" NOT NULL, "deactivatedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_5dc1836fc17abdcad4cafee7246" UNIQUE ("depotStaffId", "depotId", "role"), CONSTRAINT "PK_fe44cf6af3b8fa5cdadc605c8de" PRIMARY KEY ("depotStaffRoleId"))`);
        await queryRunner.query(`ALTER TABLE "depot_staff" DROP COLUMN "depotId"`);
        await queryRunner.query(`ALTER TABLE "depot_staff" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."depot_staff_role_enum"`);
        await queryRunner.query(`ALTER TABLE "depot_staff" DROP CONSTRAINT "FK_9866656b8be8fccbe4c1190c715"`);
        await queryRunner.query(`ALTER TABLE "depot_staff" ADD CONSTRAINT "UQ_9866656b8be8fccbe4c1190c715" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "depot_staff" ADD CONSTRAINT "FK_9866656b8be8fccbe4c1190c715" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
        await queryRunner.query(`ALTER TABLE "buyer_request" ADD CONSTRAINT "FK_9362c421d6a6ee9aaeca77ce5dd" FOREIGN KEY ("buyerStaffId") REFERENCES "depot_staff"("depotStaffId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
        await queryRunner.query(`ALTER TABLE "depot_staff_role" ADD CONSTRAINT "FK_ff9867e3401f7a36c1d8705464a" FOREIGN KEY ("depotId") REFERENCES "depot"("depotId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
        await queryRunner.query(`ALTER TABLE "depot_staff_role" ADD CONSTRAINT "FK_93b12be06ccd11eb618fd2f2a5d" FOREIGN KEY ("depotStaffId") REFERENCES "depot_staff"("depotStaffId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "depot_staff_role" DROP CONSTRAINT "FK_93b12be06ccd11eb618fd2f2a5d"`);
        await queryRunner.query(`ALTER TABLE "depot_staff_role" DROP CONSTRAINT "FK_ff9867e3401f7a36c1d8705464a"`);
        await queryRunner.query(`ALTER TABLE "buyer_request" DROP CONSTRAINT "FK_9362c421d6a6ee9aaeca77ce5dd"`);
        await queryRunner.query(`ALTER TABLE "depot_staff" DROP CONSTRAINT "FK_9866656b8be8fccbe4c1190c715"`);
        await queryRunner.query(`ALTER TABLE "depot_staff" DROP CONSTRAINT "UQ_9866656b8be8fccbe4c1190c715"`);
        await queryRunner.query(`ALTER TABLE "depot_staff" ADD CONSTRAINT "FK_9866656b8be8fccbe4c1190c715" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
        await queryRunner.query(`CREATE TYPE "public"."depot_staff_role_enum" AS ENUM('manager', 'admin')`);
        await queryRunner.query(`ALTER TABLE "depot_staff" ADD "role" "public"."depot_staff_role_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "depot_staff" ADD "depotId" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "depot_staff_role"`);
        await queryRunner.query(`DROP TYPE "public"."depot_staff_role_role_enum"`);
        await queryRunner.query(`ALTER TABLE "buyer_request" RENAME COLUMN "buyerStaffId" TO "buyerId"`);
        await queryRunner.query(`ALTER TABLE "buyer_request" ADD CONSTRAINT "FK_1b7fad83f4be5bef6b50076a137" FOREIGN KEY ("buyerId") REFERENCES "buyer"("buyerId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
        await queryRunner.query(`ALTER TABLE "depot_staff" ADD CONSTRAINT "FK_2285a698083eafb9a55bce81de8" FOREIGN KEY ("depotId") REFERENCES "depot"("depotId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
    }

}
