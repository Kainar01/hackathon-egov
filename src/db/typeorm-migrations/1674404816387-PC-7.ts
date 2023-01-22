import type { MigrationInterface, QueryRunner } from "typeorm";

export class PC71674404816387 implements MigrationInterface {
    name = 'PC71674404816387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipping" ADD "fee" numeric NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "shipping"."fee" IS 'Fee per kg in percentage'`);
        await queryRunner.query(`COMMENT ON COLUMN "route"."fee" IS 'Fee per kg in percentage'`);
        await queryRunner.query(`ALTER TABLE "route_gate" DROP CONSTRAINT "FK_c75832a58be01d87d8445d8d24e"`);
        await queryRunner.query(`ALTER TABLE "route_gate" DROP CONSTRAINT "FK_a1754cb057b3fdf2f9cf8eeaec7"`);
        await queryRunner.query(`COMMENT ON COLUMN "route_gate"."gateId" IS 'Departure gate'`);
        await queryRunner.query(`COMMENT ON COLUMN "route_gate"."nextGateId" IS 'Next destination gate'`);
        await queryRunner.query(`COMMENT ON COLUMN "route_gate"."time" IS 'Time taken between two gates'`);
        await queryRunner.query(`COMMENT ON COLUMN "route_gate"."distance" IS 'Distance between two gates'`);
        await queryRunner.query(`COMMENT ON COLUMN "shipping"."weight" IS 'Total shipping weight in kg'`);
        await queryRunner.query(`ALTER TABLE "carrier" ADD CONSTRAINT "UQ_c1d666ddf51637b13905e941869" UNIQUE ("carrierId", "userId")`);
        await queryRunner.query(`ALTER TABLE "shipping_route_gate" ADD CONSTRAINT "UQ_80dc5adcbc3a7a04f3bf47dde1a" UNIQUE ("shippingId", "routeGateId")`);
        await queryRunner.query(`ALTER TABLE "route_gate" ADD CONSTRAINT "FK_c75832a58be01d87d8445d8d24e" FOREIGN KEY ("gateId") REFERENCES "gate"("gateId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
        await queryRunner.query(`ALTER TABLE "route_gate" ADD CONSTRAINT "FK_a1754cb057b3fdf2f9cf8eeaec7" FOREIGN KEY ("nextGateId") REFERENCES "gate"("gateId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route_gate" DROP CONSTRAINT "FK_a1754cb057b3fdf2f9cf8eeaec7"`);
        await queryRunner.query(`ALTER TABLE "route_gate" DROP CONSTRAINT "FK_c75832a58be01d87d8445d8d24e"`);
        await queryRunner.query(`ALTER TABLE "shipping_route_gate" DROP CONSTRAINT "UQ_80dc5adcbc3a7a04f3bf47dde1a"`);
        await queryRunner.query(`ALTER TABLE "carrier" DROP CONSTRAINT "UQ_c1d666ddf51637b13905e941869"`);
        await queryRunner.query(`COMMENT ON COLUMN "shipping"."weight" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "route_gate"."distance" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "route_gate"."time" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "route_gate"."nextGateId" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "route_gate"."gateId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "route_gate" ADD CONSTRAINT "FK_a1754cb057b3fdf2f9cf8eeaec7" FOREIGN KEY ("nextGateId") REFERENCES "gate"("gateId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
        await queryRunner.query(`ALTER TABLE "route_gate" ADD CONSTRAINT "FK_c75832a58be01d87d8445d8d24e" FOREIGN KEY ("gateId") REFERENCES "gate"("gateId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
        await queryRunner.query(`COMMENT ON COLUMN "route"."fee" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "shipping"."fee" IS 'Fee per kg in percentage'`);
        await queryRunner.query(`ALTER TABLE "shipping" DROP COLUMN "fee"`);
    }

}
