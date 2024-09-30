import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config/config.module';
import { RolePermissionsModule } from './modules/role-permissions/role-permissions.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { DepartmentModule } from './modules/department/department.module';
import { ProjectModule } from './modules/project/project.module';
import { ProjetService } from './modules/project/projet.service';

@Module({
  imports: [AppConfigModule, AuthModule, RolePermissionsModule, EmployeeModule, DepartmentModule, ProjectModule],
  controllers: [AppController],
  providers: [AppService, ProjetService],
})
export class AppModule { }
