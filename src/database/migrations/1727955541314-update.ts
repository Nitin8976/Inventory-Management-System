import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1727955541314 implements MigrationInterface {
    name = 'Update1727955541314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`identity\` ADD \`status\` enum ('active', 'de_active') NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`identity\` DROP COLUMN \`status\``);
    }

}
