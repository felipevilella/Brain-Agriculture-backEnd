import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProducer1748344977587 implements MigrationInterface {
    name = 'UpdateProducer1748344977587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farms" RENAME COLUMN "states" TO "state"`);
        await queryRunner.query(`ALTER TYPE "public"."producers_states_enum" RENAME TO "producers_states_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."producers_state_enum" AS ENUM('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO')`);
        await queryRunner.query(`ALTER TABLE "producers" ALTER COLUMN "state" TYPE "public"."producers_state_enum" USING "state"::"text"::"public"."producers_state_enum"`);
        await queryRunner.query(`DROP TYPE "public"."producers_states_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."producers_states_enum_old" AS ENUM('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO')`);
        await queryRunner.query(`ALTER TABLE "producers" ALTER COLUMN "state" TYPE "public"."producers_states_enum_old" USING "state"::"text"::"public"."producers_states_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."producers_state_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."producers_states_enum_old" RENAME TO "producers_states_enum"`);
        await queryRunner.query(`ALTER TABLE "farms" RENAME COLUMN "state" TO "states"`);
    }

}
