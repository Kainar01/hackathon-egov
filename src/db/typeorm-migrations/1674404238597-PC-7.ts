import type { MigrationInterface, QueryRunner } from "typeorm";

export class PC71674404238597 implements MigrationInterface {
    name = 'PC71674404238597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "carrier" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "carrierId" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_7f6eb1670deb5ed81643847f8bc" PRIMARY KEY ("carrierId"))`);
        await queryRunner.query(`CREATE TYPE "public"."shipping_type_enum" AS ENUM('air', 'road', 'sea', 'rail')`);
        await queryRunner.query(`CREATE TABLE "shipping" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "shippingId" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "carrierId" integer NOT NULL, "routeId" integer NOT NULL, "type" "public"."shipping_type_enum" NOT NULL, "weight" numeric NOT NULL, CONSTRAINT "CHK_355b1faf47d50ff96def7dc655" CHECK ("weight" >= 0), CONSTRAINT "PK_7bb53fc029bd38a48d26ffefce5" PRIMARY KEY ("shippingId"))`);
        await queryRunner.query(`CREATE TABLE "shipping_route_gate" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "shippingRouteGateId" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "shippingId" integer NOT NULL, "routeGateId" integer NOT NULL, "arrival" TIMESTAMP WITH TIME ZONE, "departure" TIMESTAMP WITH TIME ZONE, "skipped" boolean NOT NULL DEFAULT false, "comment" text, CONSTRAINT "PK_8b8dcac991ec2714b46ef7a265a" PRIMARY KEY ("shippingRouteGateId"))`);
        await queryRunner.query(`ALTER TABLE "carrier" ADD CONSTRAINT "FK_62f0d204c7ecad7d89f03c1b876" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
        await queryRunner.query(`ALTER TABLE "shipping" ADD CONSTRAINT "FK_89b2efc27365e78fac1083d8aa2" FOREIGN KEY ("carrierId") REFERENCES "carrier"("carrierId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
        await queryRunner.query(`ALTER TABLE "shipping" ADD CONSTRAINT "FK_9ce92b150fbd3be14be4bfe62ac" FOREIGN KEY ("routeId") REFERENCES "route"("routeId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shipping_route_gate" ADD CONSTRAINT "FK_820c43725eb894ea2aea5f40a31" FOREIGN KEY ("shippingId") REFERENCES "shipping"("shippingId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
        await queryRunner.query(`ALTER TABLE "shipping_route_gate" ADD CONSTRAINT "FK_dce08ad68946066162b8ed04763" FOREIGN KEY ("routeGateId") REFERENCES "route_gate"("routeGateId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipping_route_gate" DROP CONSTRAINT "FK_dce08ad68946066162b8ed04763"`);
        await queryRunner.query(`ALTER TABLE "shipping_route_gate" DROP CONSTRAINT "FK_820c43725eb894ea2aea5f40a31"`);
        await queryRunner.query(`ALTER TABLE "shipping" DROP CONSTRAINT "FK_9ce92b150fbd3be14be4bfe62ac"`);
        await queryRunner.query(`ALTER TABLE "shipping" DROP CONSTRAINT "FK_89b2efc27365e78fac1083d8aa2"`);
        await queryRunner.query(`ALTER TABLE "carrier" DROP CONSTRAINT "FK_62f0d204c7ecad7d89f03c1b876"`);
        await queryRunner.query(`DROP TABLE "shipping_route_gate"`);
        await queryRunner.query(`DROP TABLE "shipping"`);
        await queryRunner.query(`DROP TYPE "public"."shipping_type_enum"`);
        await queryRunner.query(`DROP TABLE "carrier"`);
    }

}
