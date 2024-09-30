import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigModule } from '../typeorm-config.module';

import * as path from 'path';
import app from '../../config/app.config';
import database from '../../database/config/database.config';
import { Seeder } from './seeder';
import { PermissionSeedModule } from './permission/permission.module';

const loadConfig = [app, database];
const currentEnv = process.env.NODE_ENV || 'local';

console.info('Current Environment: ' + currentEnv);

@Module({
  imports: [
    TypeOrmConfigModule,
    PermissionSeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: loadConfig,
      envFilePath: path.resolve(process.cwd(), 'env', `.env.${currentEnv}`),
    }),
  ],
  providers: [Seeder],
})
export class SeedModule { }
