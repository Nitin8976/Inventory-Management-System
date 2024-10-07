import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from './entity/employee.entity';
import { DepartmentEntity } from '../department/entity/department.entity';
import { UserRoleEntity } from '../role-permissions/entity/user-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    EmployeeEntity,
    UserRoleEntity,
    DepartmentEntity,
  ])],
  providers: [EmployeeService],
  controllers: [EmployeeController]
})
export class EmployeeModule { }
