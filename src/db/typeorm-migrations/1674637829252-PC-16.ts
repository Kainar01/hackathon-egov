import type { MigrationInterface, QueryRunner } from "typeorm";

export class PC161674637829252 implements MigrationInterface {
    name = 'PC161674637829252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "depotId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9b4cad16efe7ccef190672e20de" FOREIGN KEY ("depotId") REFERENCES "depot"("depotId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9b4cad16efe7ccef190672e20de"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "depotId"`);
    }

}
