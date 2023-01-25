import type { MigrationInterface, QueryRunner } from "typeorm";

export class PC151674617947312 implements MigrationInterface {
    name = 'PC151674617947312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parcel" DROP CONSTRAINT "FK_094211a146f44d048d09cae6f66"`);
        await queryRunner.query(`ALTER TABLE "parcel" ALTER COLUMN "destinationDepotId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "parcel" ADD CONSTRAINT "FK_094211a146f44d048d09cae6f66" FOREIGN KEY ("destinationDepotId") REFERENCES "depot"("depotId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parcel" DROP CONSTRAINT "FK_094211a146f44d048d09cae6f66"`);
        await queryRunner.query(`ALTER TABLE "parcel" ALTER COLUMN "destinationDepotId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "parcel" ADD CONSTRAINT "FK_094211a146f44d048d09cae6f66" FOREIGN KEY ("destinationDepotId") REFERENCES "depot"("depotId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
