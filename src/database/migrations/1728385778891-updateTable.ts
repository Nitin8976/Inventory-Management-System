import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable1728385778891 implements MigrationInterface {
    name = 'UpdateTable1728385778891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`identity\` DROP COLUMN \`new_account_tour\``);
        await queryRunner.query(`ALTER TABLE \`identity\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`identity\` ADD \`name\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`identity\` ADD UNIQUE INDEX \`IDX_0d9005670fa2ee7dcc48842f64\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`identity\` CHANGE \`status\` \`status\` enum ('active', 'de_active') NOT NULL DEFAULT 'active'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`identity\` CHANGE \`status\` \`status\` enum ('active', 'de_active') NULL`);
        await queryRunner.query(`ALTER TABLE \`identity\` DROP INDEX \`IDX_0d9005670fa2ee7dcc48842f64\``);
        await queryRunner.query(`ALTER TABLE \`identity\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`identity\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`identity\` ADD \`new_account_tour\` tinyint NOT NULL DEFAULT '0'`);
    }

}
