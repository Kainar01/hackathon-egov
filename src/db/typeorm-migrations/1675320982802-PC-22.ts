import type { MigrationInterface, QueryRunner } from "typeorm"

export class PC221675320982802 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "shipping_route_gate"`);
    }

    public async down(): Promise<void> {
    }

}
