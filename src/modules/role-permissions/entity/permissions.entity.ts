import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn, ManyToOne } from 'typeorm';
import { eModulePermission } from 'src/utils/types/entities.type';
import { BaseEntity } from 'src/modules/common/entity/base.entity';
import { UserRoleEntity } from 'src/modules';
import { RoleModuleEntity } from './role-module.entity';


@Entity({ name: 'permissions' })
export class PermissionEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    permissionID: string;

    @Column({ name: 'type', type: 'simple-enum', enum: eModulePermission })
    type: eModulePermission;

    @Column({ name: 'description' })
    description: string;

    @ManyToOne(() => RoleModuleEntity, account => account.permissions)
    @JoinColumn({ name: 'moduleID' })
    roleModule: RoleModuleEntity;

    @ManyToMany(() => UserRoleEntity, userRole => userRole.rolePermissions)
    userRoles: UserRoleEntity[];

    constructor(partial: Partial<PermissionEntity>) {
        super();
        Object.assign(this, partial);
    }
}
