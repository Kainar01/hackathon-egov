import type { MigrationInterface, QueryRunner } from "typeorm";

export class PC5RouteContraints1674390880539 implements MigrationInterface {
    name = 'PC5RouteContraints1674390880539'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "CHK_8046ffbcafa0a7dc6393cc7248" CHECK ("departureDepotId" <> "destinationDepotId")`);
        await queryRunner.query(`ALTER TABLE "route_gate" ADD CONSTRAINT "CHK_3de160596351622ee5caf7c22e" CHECK ("gateId" <> "nextGateId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route_gate" DROP CONSTRAINT "CHK_3de160596351622ee5caf7c22e"`);
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "CHK_8046ffbcafa0a7dc6393cc7248"`);
    }

}
