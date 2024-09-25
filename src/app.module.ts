import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config/config.module';
import { RolePermissionsModule } from './modules/role-permissions/role-permissions.module';

@Module({
  imports: [AppConfigModule, AuthModule, RolePermissionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
