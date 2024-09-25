import { Module } from '@nestjs/common';
import { RolePermissionsService } from './role-permissions.service';
import { RolePermissionsController } from './role-permissions.controller';

@Module({
  providers: [RolePermissionsService],
  controllers: [RolePermissionsController]
})
export class RolePermissionsModule {}
