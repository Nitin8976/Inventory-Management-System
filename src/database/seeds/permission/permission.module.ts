import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionSeedService } from './permission.service';
import { PermissionEntity, RoleModuleEntity } from 'src/modules';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoleModuleEntity,
      PermissionEntity
    ])
  ],
  providers: [PermissionSeedService],
  exports: [PermissionSeedService],
})
export class PermissionSeedModule { }
