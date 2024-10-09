import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTablenew1728468108930 implements MigrationInterface {
    name = 'UpdateTablenew1728468108930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`identity\` ADD \`managerUserID\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`identity\` ADD CONSTRAINT \`FK_8fd2aa45835cca80922bf481386\` FOREIGN KEY (\`managerUserID\`) REFERENCES \`identity\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`identity\` DROP FOREIGN KEY \`FK_8fd2aa45835cca80922bf481386\``);
        await queryRunner.query(`ALTER TABLE \`identity\` DROP COLUMN \`managerUserID\``);
    }

}
