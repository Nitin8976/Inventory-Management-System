import { MigrationInterface, QueryRunner } from "typeorm";

export class NewTable1728384862428 implements MigrationInterface {
    name = 'NewTable1728384862428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`identity\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime NULL, \`modified_by\` varchar(255) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`userID\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`status\` enum ('active', 'de_active') NULL, \`new_account_tour\` tinyint NOT NULL DEFAULT 0, \`userRoleID\` varchar(36) NULL, PRIMARY KEY (\`userID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_role\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime NULL, \`modified_by\` varchar(255) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`userRoleID\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`userRoleID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role_modules\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime NULL, \`modified_by\` varchar(255) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`moduleID\` varchar(36) NOT NULL, \`name\` enum ('role_permission', 'user_management') NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`moduleID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`permissions\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime NULL, \`modified_by\` varchar(255) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`permissionID\` varchar(36) NOT NULL, \`type\` enum ('view', 'manage') NOT NULL, \`description\` varchar(255) NOT NULL, \`moduleID\` varchar(36) NULL, PRIMARY KEY (\`permissionID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`suppliers\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime NULL, \`modified_by\` varchar(255) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, \`contact_info\` text NOT NULL, \`address\` text NOT NULL, \`email\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_66181e465a65c2ddcfa9c00c9c\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime NULL, \`modified_by\` varchar(255) NULL, \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, \`description\` text NULL, \`price\` decimal(10,2) NOT NULL, \`stock_quantity\` int NOT NULL DEFAULT '0', \`supplierId\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_role_role_permissions_permissions\` (\`userRoleUserRoleID\` varchar(36) NOT NULL, \`permissionsPermissionID\` varchar(36) NOT NULL, INDEX \`IDX_df7747f52de79b694680628087\` (\`userRoleUserRoleID\`), INDEX \`IDX_9887dfebae33ebe6f762866a8e\` (\`permissionsPermissionID\`), PRIMARY KEY (\`userRoleUserRoleID\`, \`permissionsPermissionID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`identity\` ADD CONSTRAINT \`FK_e4d5e966f104d29a628abb34d05\` FOREIGN KEY (\`userRoleID\`) REFERENCES \`user_role\`(\`userRoleID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`permissions\` ADD CONSTRAINT \`FK_a94aed82a01a74f3fd1ca7a9968\` FOREIGN KEY (\`moduleID\`) REFERENCES \`role_modules\`(\`moduleID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_c143cbc0299e1f9220c4b5debd8\` FOREIGN KEY (\`supplierId\`) REFERENCES \`suppliers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_role_role_permissions_permissions\` ADD CONSTRAINT \`FK_df7747f52de79b6946806280875\` FOREIGN KEY (\`userRoleUserRoleID\`) REFERENCES \`user_role\`(\`userRoleID\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_role_role_permissions_permissions\` ADD CONSTRAINT \`FK_9887dfebae33ebe6f762866a8ea\` FOREIGN KEY (\`permissionsPermissionID\`) REFERENCES \`permissions\`(\`permissionID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_role_role_permissions_permissions\` DROP FOREIGN KEY \`FK_9887dfebae33ebe6f762866a8ea\``);
        await queryRunner.query(`ALTER TABLE \`user_role_role_permissions_permissions\` DROP FOREIGN KEY \`FK_df7747f52de79b6946806280875\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_c143cbc0299e1f9220c4b5debd8\``);
        await queryRunner.query(`ALTER TABLE \`permissions\` DROP FOREIGN KEY \`FK_a94aed82a01a74f3fd1ca7a9968\``);
        await queryRunner.query(`ALTER TABLE \`identity\` DROP FOREIGN KEY \`FK_e4d5e966f104d29a628abb34d05\``);
        await queryRunner.query(`DROP INDEX \`IDX_9887dfebae33ebe6f762866a8e\` ON \`user_role_role_permissions_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_df7747f52de79b694680628087\` ON \`user_role_role_permissions_permissions\``);
        await queryRunner.query(`DROP TABLE \`user_role_role_permissions_permissions\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP INDEX \`IDX_66181e465a65c2ddcfa9c00c9c\` ON \`suppliers\``);
        await queryRunner.query(`DROP TABLE \`suppliers\``);
        await queryRunner.query(`DROP TABLE \`permissions\``);
        await queryRunner.query(`DROP TABLE \`role_modules\``);
        await queryRunner.query(`DROP TABLE \`user_role\``);
        await queryRunner.query(`DROP TABLE \`identity\``);
    }

}
