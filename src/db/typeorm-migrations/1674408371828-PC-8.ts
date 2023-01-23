import type { MigrationInterface, QueryRunner } from "typeorm";

export class PC81674408371828 implements MigrationInterface {
    name = 'PC81674408371828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "parcel_group" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "parcelGroupId" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "shippingId" integer, "userId" integer NOT NULL, "depotId" integer NOT NULL, "weight" numeric NOT NULL, "comment" text, CONSTRAINT "CHK_b687f1432868f4cd8f4e6e3f2c" CHECK ("weight" > 0), CONSTRAINT "PK_bb02c050da031f3b6452dd016a7" PRIMARY KEY ("parcelGroupId")); COMMENT ON COLUMN "parcel_group"."weight" IS 'Total shipping weight in kg'; COMMENT ON COLUMN "parcel_group"."comment" IS 'Comment on parcel group box'`);
        await queryRunner.query(`CREATE TYPE "public"."parcel_status_type_enum" AS ENUM('registration_pending', 'need_manual_registration', 'registered', 'shipped', 'delivery_pending', 'on_delivery', 'delivered')`);
        await queryRunner.query(`CREATE TABLE "parcel_status" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "parcelStatusId" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "parcelId" integer NOT NULL, "type" "public"."parcel_status_type_enum" NOT NULL, "comment" text, CONSTRAINT "UQ_0107e903a48bc50c9d9035ebdf8" UNIQUE ("parcelId", "type"), CONSTRAINT "PK_e59d60e21d6393a531aea4324b3" PRIMARY KEY ("parcelStatusId"))`);
        await queryRunner.query(`CREATE TABLE "parcel" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "parcelId" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "userId" integer NOT NULL, "departureDepotId" integer NOT NULL, "destinationDepotId" integer NOT NULL, "parcelGroupId" integer, "parcelStatusId" integer, "trackingCode" character varying NOT NULL, "total" numeric(10,2) NOT NULL, "buyerFee" numeric(10,2) NOT NULL DEFAULT '0', "weight" numeric NOT NULL, "comment" text, CONSTRAINT "UQ_13e186cd2f9a17fe4f4fa6a3827" UNIQUE ("trackingCode"), CONSTRAINT "CHK_64bbc73f99505164b382b9cd7a" CHECK ("weight" > 0), CONSTRAINT "CHK_751acc89ef673a7bc5b5ace0dc" CHECK ("total" >= 0 AND "buyerFee" >= 0), CONSTRAINT "CHK_08ead0d2d1a74a95001db565fc" CHECK ("departureDepotId" <> "destinationDepotId"), CONSTRAINT "PK_a291b66e5f127d6b359bbe1d41e" PRIMARY KEY ("parcelId")); COMMENT ON COLUMN "parcel"."total" IS 'Total price of the order'; COMMENT ON COLUMN "parcel"."buyerFee" IS 'Total fee of the buyer'; COMMENT ON COLUMN "parcel"."weight" IS 'Total shipping weight in kg'; COMMENT ON COLUMN "parcel"."comment" IS 'Comment on parcel'`);
        await queryRunner.query(`CREATE TABLE "parcel_item" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "parcelItemId" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "parcelId" integer NOT NULL, "title" character varying NOT NULL, "quantity" integer NOT NULL, "price" numeric(10,2) NOT NULL, CONSTRAINT "UQ_3349004723c4c9b2ce420ce2004" UNIQUE ("parcelId", "title"), CONSTRAINT "CHK_dac7acf1c0120ac394c3a1436b" CHECK (price >= 0), CONSTRAINT "CHK_af5539f6a77eadc5353d90473b" CHECK (quantity > 0), CONSTRAINT "PK_3eeb19cec0ce058c264a158b9ab" PRIMARY KEY ("parcelItemId")); COMMENT ON COLUMN "parcel_item"."price" IS 'Unit price of the item'`);
        await queryRunner.query(`ALTER TABLE "parcel_group" ADD CONSTRAINT "FK_81bfae485165095346418f6d3e2" FOREIGN KEY ("shippingId") REFERENCES "shipping"("shippingId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
        await queryRunner.query(`ALTER TABLE "parcel_group" ADD CONSTRAINT "FK_1c86349c5f52484dfcbffbd2e63" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parcel_group" ADD CONSTRAINT "FK_ee7f72c9d59b71fdad336066326" FOREIGN KEY ("depotId") REFERENCES "depot"("depotId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parcel_status" ADD CONSTRAINT "FK_a068a2d37cd43e7d085ba619bbd" FOREIGN KEY ("parcelId") REFERENCES "parcel"("parcelId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
        await queryRunner.query(`ALTER TABLE "parcel" ADD CONSTRAINT "FK_48f4fcb8a5cd2f5b29166912240" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parcel" ADD CONSTRAINT "FK_912795b700d3a5965c0e46dd536" FOREIGN KEY ("departureDepotId") REFERENCES "depot"("depotId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parcel" ADD CONSTRAINT "FK_094211a146f44d048d09cae6f66" FOREIGN KEY ("destinationDepotId") REFERENCES "depot"("depotId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parcel" ADD CONSTRAINT "FK_f6f65a410a9fd230b4bb1976688" FOREIGN KEY ("parcelStatusId") REFERENCES "parcel_status"("parcelStatusId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
        await queryRunner.query(`ALTER TABLE "parcel" ADD CONSTRAINT "FK_c6038dc14ea802391ff6f8ecadd" FOREIGN KEY ("parcelGroupId") REFERENCES "parcel_group"("parcelGroupId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
        await queryRunner.query(`ALTER TABLE "parcel_item" ADD CONSTRAINT "FK_8a1b7e2822988128629bc1d2a87" FOREIGN KEY ("parcelId") REFERENCES "parcel"("parcelId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parcel_item" DROP CONSTRAINT "FK_8a1b7e2822988128629bc1d2a87"`);
        await queryRunner.query(`ALTER TABLE "parcel" DROP CONSTRAINT "FK_c6038dc14ea802391ff6f8ecadd"`);
        await queryRunner.query(`ALTER TABLE "parcel" DROP CONSTRAINT "FK_f6f65a410a9fd230b4bb1976688"`);
        await queryRunner.query(`ALTER TABLE "parcel" DROP CONSTRAINT "FK_094211a146f44d048d09cae6f66"`);
        await queryRunner.query(`ALTER TABLE "parcel" DROP CONSTRAINT "FK_912795b700d3a5965c0e46dd536"`);
        await queryRunner.query(`ALTER TABLE "parcel" DROP CONSTRAINT "FK_48f4fcb8a5cd2f5b29166912240"`);
        await queryRunner.query(`ALTER TABLE "parcel_status" DROP CONSTRAINT "FK_a068a2d37cd43e7d085ba619bbd"`);
        await queryRunner.query(`ALTER TABLE "parcel_group" DROP CONSTRAINT "FK_ee7f72c9d59b71fdad336066326"`);
        await queryRunner.query(`ALTER TABLE "parcel_group" DROP CONSTRAINT "FK_1c86349c5f52484dfcbffbd2e63"`);
        await queryRunner.query(`ALTER TABLE "parcel_group" DROP CONSTRAINT "FK_81bfae485165095346418f6d3e2"`);
        await queryRunner.query(`DROP TABLE "parcel_item"`);
        await queryRunner.query(`DROP TABLE "parcel"`);
        await queryRunner.query(`DROP TABLE "parcel_status"`);
        await queryRunner.query(`DROP TYPE "public"."parcel_status_type_enum"`);
        await queryRunner.query(`DROP TABLE "parcel_group"`);
    }

}
