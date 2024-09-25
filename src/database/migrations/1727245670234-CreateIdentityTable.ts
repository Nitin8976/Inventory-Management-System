import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIdentityTable1727245670234 implements MigrationInterface {
    name = 'CreateIdentityTable1727245670234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`identity\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime NULL, \`modified_by\` varchar(255) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`userID\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`new_account_tour\` tinyint NOT NULL DEFAULT 0, \`userRoleID\` varchar(36) NULL, PRIMARY KEY (\`userID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_role\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime NULL, \`modified_by\` varchar(255) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`userRoleID\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`userRoleID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`permissions\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime NULL, \`modified_by\` varchar(255) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`permissionID\` varchar(36) NOT NULL, \`type\` enum ('view', 'manage') NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`permissionID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_role_role_permissions_permissions\` (\`userRoleUserRoleID\` varchar(36) NOT NULL, \`permissionsPermissionID\` varchar(36) NOT NULL, INDEX \`IDX_df7747f52de79b694680628087\` (\`userRoleUserRoleID\`), INDEX \`IDX_9887dfebae33ebe6f762866a8e\` (\`permissionsPermissionID\`), PRIMARY KEY (\`userRoleUserRoleID\`, \`permissionsPermissionID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`identity\` ADD CONSTRAINT \`FK_e4d5e966f104d29a628abb34d05\` FOREIGN KEY (\`userRoleID\`) REFERENCES \`user_role\`(\`userRoleID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_role_role_permissions_permissions\` ADD CONSTRAINT \`FK_df7747f52de79b6946806280875\` FOREIGN KEY (\`userRoleUserRoleID\`) REFERENCES \`user_role\`(\`userRoleID\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_role_role_permissions_permissions\` ADD CONSTRAINT \`FK_9887dfebae33ebe6f762866a8ea\` FOREIGN KEY (\`permissionsPermissionID\`) REFERENCES \`permissions\`(\`permissionID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_role_role_permissions_permissions\` DROP FOREIGN KEY \`FK_9887dfebae33ebe6f762866a8ea\``);
        await queryRunner.query(`ALTER TABLE \`user_role_role_permissions_permissions\` DROP FOREIGN KEY \`FK_df7747f52de79b6946806280875\``);
        await queryRunner.query(`ALTER TABLE \`identity\` DROP FOREIGN KEY \`FK_e4d5e966f104d29a628abb34d05\``);
        await queryRunner.query(`DROP INDEX \`IDX_9887dfebae33ebe6f762866a8e\` ON \`user_role_role_permissions_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_df7747f52de79b694680628087\` ON \`user_role_role_permissions_permissions\``);
        await queryRunner.query(`DROP TABLE \`user_role_role_permissions_permissions\``);
        await queryRunner.query(`DROP TABLE \`permissions\``);
        await queryRunner.query(`DROP TABLE \`user_role\``);
        await queryRunner.query(`DROP TABLE \`identity\``);
    }

}
