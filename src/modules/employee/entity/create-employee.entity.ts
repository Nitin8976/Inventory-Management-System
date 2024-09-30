import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/modules/common/entity/base.entity';
import { DepartmentEntity } from 'src/modules/department/entity/create-department.entity';
import { RoleModuleEntity } from 'src/modules/role-permissions/entity/role-module.entity';
import { ProjectEntity } from 'src/modules/project/entity/create-project.entity';

@Entity({ name: 'employees' })
export class EmployeeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  employeeID: string;

  @Column({ name: 'name', length: 100 })
  name: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @ManyToOne(() => RoleModuleEntity, (role) => role.employees)
  role: RoleModuleEntity;

  @ManyToOne(() => DepartmentEntity, (department) => department.employees)
  department: DepartmentEntity;

  @OneToMany(() => ProjectEntity, (project) => project.employee)
  projects: ProjectEntity[];

  constructor(partial: Partial<EmployeeEntity>) {
    super();
    Object.assign(this, partial);
  }
}
