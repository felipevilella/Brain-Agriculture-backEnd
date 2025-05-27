import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseBrain1748341082564 implements MigrationInterface {
    name = 'DatabaseBrain1748341082564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."crops_name_enum" AS ENUM('SOYBEAN', 'CORN', 'WHEAT', 'RICE', 'SORGHUM', 'BARLEY', 'OATS', 'MILLET', 'BEAN', 'PEANUT', 'CHICKPEA', 'LENTIL', 'SESAME', 'CASSAVA', 'SWEET POTATO', 'POTATO', 'YAM', 'TARO', 'ORANGE', 'LEMON', 'PINEAPPLE', 'MANGO', 'PASSION FRUIT', 'BANANA', 'PAPAYA', 'GRAPE', 'WATERMELON', 'MELON', 'COFFEE', 'SUGARCANE', 'EUCALYPTUS', 'PINE', 'MATE', 'COCOA', 'LETTUCE', 'TOMATO', 'ONION', 'CARROT', 'CABBAGE', 'BELL PEPPER', 'KALE', 'PUMPKIN', 'CUCUMBER', 'COTTON', 'TOBACCO', 'SUNFLOWER', 'CASTOR BEAN', 'PASTURE')`);
        await queryRunner.query(`CREATE TABLE "crops" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "harvestId" uuid NOT NULL, "name" "public"."crops_name_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_098dbeb7c803dc7c08a7f02b805" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "harvests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "farmId" uuid, CONSTRAINT "PK_fb748ae28bc0000875b1949a0a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "farms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "producerId" uuid NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "totalArea" double precision NOT NULL, "arableArea" double precision NOT NULL, "vegetationArea" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_39aff9c35006b14025bba5a43d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."producers_state_enum" AS ENUM('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO')`);
        await queryRunner.query(`CREATE TABLE "producers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "city" character varying NOT NULL, "state" "public"."producers_state_enum" NOT NULL, "document" character varying NOT NULL, "typeDocument" character varying NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_55554aac38152436aa25b1e3530" UNIQUE ("document"), CONSTRAINT "PK_7f16886d1a44ed0974232b82506" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "crops" ADD CONSTRAINT "FK_311cb381f0aab2e24d7b4afcfae" FOREIGN KEY ("harvestId") REFERENCES "harvests"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "harvests" ADD CONSTRAINT "FK_1a1b3f03ae8fcad1ba5b46bae3a" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "farms" ADD CONSTRAINT "FK_a47fa1b0ccf320f4028705ca3dd" FOREIGN KEY ("producerId") REFERENCES "producers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farms" DROP CONSTRAINT "FK_a47fa1b0ccf320f4028705ca3dd"`);
        await queryRunner.query(`ALTER TABLE "harvests" DROP CONSTRAINT "FK_1a1b3f03ae8fcad1ba5b46bae3a"`);
        await queryRunner.query(`ALTER TABLE "crops" DROP CONSTRAINT "FK_311cb381f0aab2e24d7b4afcfae"`);
        await queryRunner.query(`DROP TABLE "producers"`);
        await queryRunner.query(`DROP TYPE "public"."producers_state_enum"`);
        await queryRunner.query(`DROP TABLE "farms"`);
        await queryRunner.query(`DROP TABLE "harvests"`);
        await queryRunner.query(`DROP TABLE "crops"`);
        await queryRunner.query(`DROP TYPE "public"."crops_name_enum"`);
    }

}
