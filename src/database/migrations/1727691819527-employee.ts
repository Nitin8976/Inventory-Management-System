import { MigrationInterface, QueryRunner } from "typeorm";

export class Employee1727691819527 implements MigrationInterface {
    name = 'Employee1727691819527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`employees\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime NULL, \`modified_by\` varchar(255) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`employeeID\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`roleModuleID\` varchar(36) NULL, UNIQUE INDEX \`IDX_765bc1ac8967533a04c74a9f6a\` (\`email\`), PRIMARY KEY (\`employeeID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`departments\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime NULL, \`modified_by\` varchar(255) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`departmentID\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_8681da666ad9699d568b3e9106\` (\`name\`), PRIMARY KEY (\`departmentID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`employees\` ADD CONSTRAINT \`FK_4d43c1e69254614f9b9c4af810e\` FOREIGN KEY (\`roleModuleID\`) REFERENCES \`role_modules\`(\`moduleID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employees\` DROP FOREIGN KEY \`FK_4d43c1e69254614f9b9c4af810e\``);
        await queryRunner.query(`DROP INDEX \`IDX_8681da666ad9699d568b3e9106\` ON \`departments\``);
        await queryRunner.query(`DROP TABLE \`departments\``);
        await queryRunner.query(`DROP INDEX \`IDX_765bc1ac8967533a04c74a9f6a\` ON \`employees\``);
        await queryRunner.query(`DROP TABLE \`employees\``);
    }

}
