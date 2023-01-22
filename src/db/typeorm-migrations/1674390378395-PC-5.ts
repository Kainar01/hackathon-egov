import type { MigrationInterface, QueryRunner } from "typeorm";

export class PC51674390378395 implements MigrationInterface {
    name = 'PC51674390378395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "gate" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "gateId" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "countryId" integer NOT NULL, "depotId" integer, "name" character varying NOT NULL, "description" text, "lat" numeric(8,6), "lng" numeric(9,6), CONSTRAINT "CHK_87d346c5c82f37231ec29e87f9" CHECK (("lat" IS NOT NULL AND "lng" IS NOT NULL) OR "depotId" IS NOT NULL), CONSTRAINT "PK_58f235992de7a6b2110aabd8743" PRIMARY KEY ("gateId"))`);
        await queryRunner.query(`CREATE TABLE "route" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "routeId" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "departureDepotId" integer NOT NULL, "destinationDepotId" integer NOT NULL, "name" character varying NOT NULL, "fee" numeric NOT NULL, "estimatedDeliveryDays" integer, "description" text, CONSTRAINT "PK_ddeecfd91aa8b96fa1cc9b3cba9" PRIMARY KEY ("routeId"))`);
        await queryRunner.query(`CREATE TABLE "route_gate" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "routeGateId" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "routeId" integer NOT NULL, "gateId" integer NOT NULL, "nextGateId" integer NOT NULL, "time" character varying, "distance" character varying, "order" integer NOT NULL, CONSTRAINT "PK_af71743fcb057fb018892dbd53a" PRIMARY KEY ("routeGateId"))`);
        await queryRunner.query(`ALTER TABLE "gate" ADD CONSTRAINT "FK_612a822218a4c45e083e39bacb8" FOREIGN KEY ("depotId") REFERENCES "depot"("depotId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gate" ADD CONSTRAINT "FK_0a9b0dffa4fcce5ddfc415cf169" FOREIGN KEY ("countryId") REFERENCES "country"("countryId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "FK_9fb4cd74428ec613756697a42c0" FOREIGN KEY ("departureDepotId") REFERENCES "depot"("depotId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "FK_93075dc424fbc70abc6f65f9a9a" FOREIGN KEY ("destinationDepotId") REFERENCES "depot"("depotId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "route_gate" ADD CONSTRAINT "FK_c75832a58be01d87d8445d8d24e" FOREIGN KEY ("gateId") REFERENCES "gate"("gateId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
        await queryRunner.query(`ALTER TABLE "route_gate" ADD CONSTRAINT "FK_a1754cb057b3fdf2f9cf8eeaec7" FOREIGN KEY ("nextGateId") REFERENCES "gate"("gateId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
        await queryRunner.query(`ALTER TABLE "route_gate" ADD CONSTRAINT "FK_ded2dba694285fa328dd9414359" FOREIGN KEY ("routeId") REFERENCES "route"("routeId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route_gate" DROP CONSTRAINT "FK_ded2dba694285fa328dd9414359"`);
        await queryRunner.query(`ALTER TABLE "route_gate" DROP CONSTRAINT "FK_a1754cb057b3fdf2f9cf8eeaec7"`);
        await queryRunner.query(`ALTER TABLE "route_gate" DROP CONSTRAINT "FK_c75832a58be01d87d8445d8d24e"`);
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_93075dc424fbc70abc6f65f9a9a"`);
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_9fb4cd74428ec613756697a42c0"`);
        await queryRunner.query(`ALTER TABLE "gate" DROP CONSTRAINT "FK_0a9b0dffa4fcce5ddfc415cf169"`);
        await queryRunner.query(`ALTER TABLE "gate" DROP CONSTRAINT "FK_612a822218a4c45e083e39bacb8"`);
        await queryRunner.query(`DROP TABLE "route_gate"`);
        await queryRunner.query(`DROP TABLE "route"`);
        await queryRunner.query(`DROP TABLE "gate"`);
    }

}
