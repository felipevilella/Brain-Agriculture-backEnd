import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateHarvests1748384573203 implements MigrationInterface {
    name = 'UpdateHarvests1748384573203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "harvests" DROP CONSTRAINT "FK_1a1b3f03ae8fcad1ba5b46bae3a"`);
        await queryRunner.query(`ALTER TABLE "harvests" ALTER COLUMN "farmId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "harvests" ADD CONSTRAINT "FK_1a1b3f03ae8fcad1ba5b46bae3a" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "harvests" DROP CONSTRAINT "FK_1a1b3f03ae8fcad1ba5b46bae3a"`);
        await queryRunner.query(`ALTER TABLE "harvests" ALTER COLUMN "farmId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "harvests" ADD CONSTRAINT "FK_1a1b3f03ae8fcad1ba5b46bae3a" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
