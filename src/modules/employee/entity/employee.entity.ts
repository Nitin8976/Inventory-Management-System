import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/modules/common/entity/base.entity';
import { DepartmentEntity } from 'src/modules/department/entity/department.entity';
import { RoleModuleEntity } from 'src/modules/role-permissions/entity/role-module.entity';
import { ProjectEntity } from 'src/modules/project/entity/project.entity';
import { UserRoleEntity } from 'src/modules/role-permissions/entity/user-role.entity';

@Entity({ name: 'employees' })
export class EmployeeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  employeeID: string;

  @Column({ name: 'name', length: 100 })
  name: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  position: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salary: number;

  @Column({ type: 'date' })
  dateOfHire: Date;

  @Column({ type: 'varchar', length: 255 }) // Adjust length as necessary
  password: string;  // Optional password field for initial setup

  @ManyToOne(() => UserRoleEntity, (role) => role.employees)
  role: UserRoleEntity;

  @ManyToOne(() => DepartmentEntity, (department) => department.employees)
  department: DepartmentEntity;

  @OneToMany(() => ProjectEntity, (project) => project.employee)
  projects: ProjectEntity[];

  @ManyToOne(() => EmployeeEntity, { nullable: true })
  manager: EmployeeEntity;

  constructor(partial: Partial<EmployeeEntity>) {
    super();
    Object.assign(this, partial);
  }
}
function IsOptional(): (target: EmployeeEntity, propertyKey: "password") => void {
  throw new Error('Function not implemented.');
}

