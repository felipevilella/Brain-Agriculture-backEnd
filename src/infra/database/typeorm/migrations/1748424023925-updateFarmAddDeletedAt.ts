import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFarmAddDeletedAt1748424023925 implements MigrationInterface {
    name = 'UpdateFarmAddDeletedAt1748424023925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farms" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farms" DROP COLUMN "deletedAt"`);
    }

}
