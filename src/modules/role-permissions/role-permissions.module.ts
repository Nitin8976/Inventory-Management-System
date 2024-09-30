import { Module } from '@nestjs/common';
import { RolePermissionsService } from './role-permissions.service';
import { RolePermissionsController } from './role-permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleEntity } from './entity/user-role.entity';
import { PermissionEntity } from './entity/permissions.entity';
import { RoleModuleEntity } from './entity/role-module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    UserRoleEntity,
    PermissionEntity,
    RoleModuleEntity
  ])],
  providers: [RolePermissionsService],
  controllers: [RolePermissionsController]
})
export class RolePermissionsModule { }
