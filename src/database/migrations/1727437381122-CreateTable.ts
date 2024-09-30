import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1727437381122 implements MigrationInterface {
    name = 'CreateTable1727437381122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role_modules\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime NULL, \`modified_by\` varchar(255) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`moduleID\` varchar(36) NOT NULL, \`name\` enum ('role_permission', 'user_management') NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`moduleID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`permissions\` ADD \`moduleID\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`permissions\` ADD CONSTRAINT \`FK_a94aed82a01a74f3fd1ca7a9968\` FOREIGN KEY (\`moduleID\`) REFERENCES \`role_modules\`(\`moduleID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permissions\` DROP FOREIGN KEY \`FK_a94aed82a01a74f3fd1ca7a9968\``);
        await queryRunner.query(`ALTER TABLE \`permissions\` DROP COLUMN \`moduleID\``);
        await queryRunner.query(`DROP TABLE \`role_modules\``);
    }

}
