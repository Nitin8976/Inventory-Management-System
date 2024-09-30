import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { modulePermissions, roleModules } from './data';
import { eModulePermission } from 'src/utils/types/entities.type';
import { PermissionEntity, RoleModuleEntity } from 'src/modules';

@Injectable()
export class PermissionSeedService {
  constructor(
    @InjectRepository(RoleModuleEntity)
    private readonly roleModuleRepository: Repository<RoleModuleEntity>,
    @InjectRepository(PermissionEntity)
    private readonly modulePermissionRepository: Repository<PermissionEntity>
  ) { }

  async create(): Promise<void> {
    await this.roleModuleRepository.manager.transaction(async (manager: EntityManager) => {
      for (const module of Object.keys(modulePermissions)) {
        const newModule = this.roleModuleRepository.create({
          name: roleModules.find((x) => x.name === module).name,
          description: roleModules.find((x) => x.name === module).description
        });

        await manager.save(RoleModuleEntity, newModule);

        for (const permission of modulePermissions[module]) {
          if (!(['dashboard', 'activity_log'].includes(module) && permission.type === eModulePermission.MANAGE)) {
            const newPermission = this.modulePermissionRepository.create({
              type: permission.type,
              description: permission.description,
              roleModule: newModule
            });

            await manager.save(PermissionEntity, newPermission);
          }
        }
      }
    });
  }
}
