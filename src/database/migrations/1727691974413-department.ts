import { MigrationInterface, QueryRunner } from "typeorm";

export class Department1727691974413 implements MigrationInterface {
    name = 'Department1727691974413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employees\` ADD \`departmentDepartmentID\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`employees\` ADD CONSTRAINT \`FK_c3f2e7fdd2b71eb3a68cb7abec4\` FOREIGN KEY (\`departmentDepartmentID\`) REFERENCES \`departments\`(\`departmentID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employees\` DROP FOREIGN KEY \`FK_c3f2e7fdd2b71eb3a68cb7abec4\``);
        await queryRunner.query(`ALTER TABLE \`employees\` DROP COLUMN \`departmentDepartmentID\``);
    }

}
