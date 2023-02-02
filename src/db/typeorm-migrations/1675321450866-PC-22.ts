import type { MigrationInterface, QueryRunner } from "typeorm";

export class PC221675321450866 implements MigrationInterface {
    name = 'PC221675321450866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."shipping_event_type_enum" AS ENUM('origin_departure', 'destination_delivery', 'gate_arrival')`);
        await queryRunner.query(`CREATE TABLE "shipping_event" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "shippingEventId" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "shippingId" integer NOT NULL, "gateId" integer, "arrival" TIMESTAMP WITH TIME ZONE, "departure" TIMESTAMP WITH TIME ZONE, "skipped" boolean NOT NULL DEFAULT false, "comment" text, "type" "public"."shipping_event_type_enum" NOT NULL, CONSTRAINT "PK_c46875355c1835a4b04c490e9b9" PRIMARY KEY ("shippingEventId"))`);
        await queryRunner.query(`ALTER TABLE "shipping_event" ADD CONSTRAINT "FK_29f16094b355b232db7ab7dad7c" FOREIGN KEY ("shippingId") REFERENCES "shipping"("shippingId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
        await queryRunner.query(`ALTER TABLE "shipping_event" ADD CONSTRAINT "FK_4ae71f934e7044f7cf9b0fc473d" FOREIGN KEY ("gateId") REFERENCES "gate"("gateId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipping_event" DROP CONSTRAINT "FK_4ae71f934e7044f7cf9b0fc473d"`);
        await queryRunner.query(`ALTER TABLE "shipping_event" DROP CONSTRAINT "FK_29f16094b355b232db7ab7dad7c"`);
        await queryRunner.query(`DROP TABLE "shipping_event"`);
        await queryRunner.query(`DROP TYPE "public"."shipping_event_type_enum"`);
    }

}
