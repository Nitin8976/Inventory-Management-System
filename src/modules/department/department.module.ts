import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { TypeOrmConfigModule } from 'src/database/typeorm-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentEntity } from './entity/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentEntity])],
  providers: [DepartmentService],
  controllers: [DepartmentController]
})
export class DepartmentModule { }
