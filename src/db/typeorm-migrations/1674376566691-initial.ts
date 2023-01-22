import type { MigrationInterface, QueryRunner } from "typeorm";

export class initial1674376566691 implements MigrationInterface {
    name = 'initial1674376566691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "verification" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "verificationId" uuid NOT NULL DEFAULT uuid_generate_v4(), "countryCode" character varying NOT NULL, "phone" character varying NOT NULL, "isVerified" boolean NOT NULL DEFAULT false, "smsCode" character varying NOT NULL, "expiration" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_8d80c2c676ddeda2f49654da7a0" UNIQUE ("phone", "smsCode", "countryCode"), CONSTRAINT "PK_549c87d3f24bf565cb602d3324b" PRIMARY KEY ("verificationId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6432839797a6e2a126cc8084ca" ON "verification" ("expiration") `);
        await queryRunner.query(`CREATE TABLE "country" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "countryId" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "slug" character varying NOT NULL, "order" integer, CONSTRAINT "UQ_2c5aa339240c0c3ae97fcc9dc4c" UNIQUE ("name"), CONSTRAINT "UQ_8ff4c23dc9a3f3856555bd86186" UNIQUE ("code"), CONSTRAINT "UQ_4cd2b9410fe9cb70466134c2f9a" UNIQUE ("slug"), CONSTRAINT "PK_3a3e2be7bdd3cf3ddc8858e1a87" PRIMARY KEY ("countryId"))`);
        await queryRunner.query(`CREATE TABLE "city" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "cityId" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "countryId" integer NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "lat" numeric(8,6), "lng" numeric(9,6), "order" integer, CONSTRAINT "UQ_cea617d634d701b8f8a827167f0" UNIQUE ("countryId", "slug"), CONSTRAINT "UQ_aabfd2784728ad817ffe99ade0c" UNIQUE ("countryId", "name"), CONSTRAINT "PK_ab4faadf32d1887168156ec8ea9" PRIMARY KEY ("cityId"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'manager')`);
        await queryRunner.query(`CREATE TABLE "user" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "firstName" character varying, "lastName" character varying, "middleName" character varying, "iin" character varying, "email" character varying, "role" "public"."user_role_enum", "phone" text NOT NULL, "password" character varying, "balance" numeric(10,2) NOT NULL DEFAULT '0', "cityId" integer, "countryId" integer, "picture" jsonb, "birthDate" TIMESTAMP WITH TIME ZONE, "isVerified" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_40e6cbd92bd7f1e31f3eae940b9" UNIQUE ("iin"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "CHK_ac54714f5b5edf50d225b5a323" CHECK (balance >= 0), CONSTRAINT "CHK_67ffa6b9e6bd10e6ecf753e5e2" CHECK (email = lower(email)), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_document_documenttype_enum" AS ENUM('id_card_front', 'id_card_back', 'passport', 'contract')`);
        await queryRunner.query(`CREATE TABLE "user_document" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userDocumentId" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "userId" integer NOT NULL, "fileUrl" character varying NOT NULL, "isVerified" boolean NOT NULL DEFAULT false, "mimeType" character varying NOT NULL, "documentType" "public"."user_document_documenttype_enum" NOT NULL, CONSTRAINT "UQ_a87fa2ee34c6455929df0bd0161" UNIQUE ("userId", "documentType"), CONSTRAINT "PK_b981de8261239d15bd7d332d442" PRIMARY KEY ("userDocumentId"))`);
        await queryRunner.query(`ALTER TABLE "city" ADD CONSTRAINT "FK_990b8a57ab901cb812e2b52fcf0" FOREIGN KEY ("countryId") REFERENCES "country"("countryId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_beb5846554bec348f6baf449e83" FOREIGN KEY ("cityId") REFERENCES "city"("cityId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_4aaf6d02199282eb8d3931bff31" FOREIGN KEY ("countryId") REFERENCES "country"("countryId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_document" ADD CONSTRAINT "FK_bea6ff5b6ea0d461a438a2e837c" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_document" DROP CONSTRAINT "FK_bea6ff5b6ea0d461a438a2e837c"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_4aaf6d02199282eb8d3931bff31"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_beb5846554bec348f6baf449e83"`);
        await queryRunner.query(`ALTER TABLE "city" DROP CONSTRAINT "FK_990b8a57ab901cb812e2b52fcf0"`);
        await queryRunner.query(`DROP TABLE "user_document"`);
        await queryRunner.query(`DROP TYPE "public"."user_document_documenttype_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "city"`);
        await queryRunner.query(`DROP TABLE "country"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6432839797a6e2a126cc8084ca"`);
        await queryRunner.query(`DROP TABLE "verification"`);
    }
}
