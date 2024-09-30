import { MigrationInterface, QueryRunner } from "typeorm";

export class Project1727692366812 implements MigrationInterface {
    name = 'Project1727692366812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`projects\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime NULL, \`modified_by\` varchar(255) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`projectID\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`employeeEmployeeID\` varchar(36) NULL, PRIMARY KEY (\`projectID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_fe260465a56325ba9c0936d8080\` FOREIGN KEY (\`employeeEmployeeID\`) REFERENCES \`employees\`(\`employeeID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_fe260465a56325ba9c0936d8080\``);
        await queryRunner.query(`DROP TABLE \`projects\``);
    }

}
