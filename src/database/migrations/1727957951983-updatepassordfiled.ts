import { MigrationInterface, QueryRunner } from "typeorm";

export class Updatepassordfiled1727957951983 implements MigrationInterface {
    name = 'Updatepassordfiled1727957951983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employees\` ADD \`password\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employees\` DROP COLUMN \`password\``);
    }

}
