import type { MigrationInterface, QueryRunner } from "typeorm";

export class PC4DepotStaff1674387246426 implements MigrationInterface {
    name = 'PC4DepotStaff1674387246426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."depot_staff_role_enum" AS ENUM('manager', 'admin')`);
        await queryRunner.query(`CREATE TABLE "depot_staff" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "depotStaffId" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "userId" integer NOT NULL, "depotId" integer NOT NULL, "role" "public"."depot_staff_role_enum" NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e4e79cea2a5f7e7325465d56c29" PRIMARY KEY ("depotStaffId"))`);
        await queryRunner.query(`ALTER TABLE "depot_staff" ADD CONSTRAINT "FK_2285a698083eafb9a55bce81de8" FOREIGN KEY ("depotId") REFERENCES "depot"("depotId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
        await queryRunner.query(`ALTER TABLE "depot_staff" ADD CONSTRAINT "FK_9866656b8be8fccbe4c1190c715" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "depot_staff" DROP CONSTRAINT "FK_9866656b8be8fccbe4c1190c715"`);
        await queryRunner.query(`ALTER TABLE "depot_staff" DROP CONSTRAINT "FK_2285a698083eafb9a55bce81de8"`);
        await queryRunner.query(`DROP TABLE "depot_staff"`);
        await queryRunner.query(`DROP TYPE "public"."depot_staff_role_enum"`);
    }

}
