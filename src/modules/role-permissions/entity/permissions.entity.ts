import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn, ManyToOne } from 'typeorm';
import { eModulePermission } from 'src/utils/types/entities.type';
import { BaseEntity } from '../common/entity/base.entity';
import { UserRoleEntity } from 'src/modules';

@Entity({ name: 'permissions' })
export class PermissionEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    permissionID: string;

    @Column({ name: 'type', type: 'simple-enum', enum: eModulePermission })
    type: eModulePermission;

    @Column({ name: 'description' })
    description: string;

    @ManyToMany(() => UserRoleEntity, userRole => userRole.rolePermissions)
    userRoles: UserRoleEntity[];

    constructor(partial: Partial<PermissionEntity>) {
        super();
        Object.assign(this, partial);
    }
}
