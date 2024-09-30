import { Injectable } from '@nestjs/common';
import { PermissionSeedService } from './permission/permission.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly permissionSeedService: PermissionSeedService,
  ) { }

  async seed() {
    // await Promise.all([this.citySeedService.create()]);
    await Promise.all([this.permissionSeedService.create()]);
  }
}
