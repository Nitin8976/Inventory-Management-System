import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/modules/common/entity/base.entity';
import { eModule } from 'src/utils/entities.type';
import { EmployeeEntity, PermissionEntity } from 'src/modules';

@Entity({ name: 'role_modules' })
export class RoleModuleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  moduleID: string;

  @Column({ name: 'name', type: 'simple-enum', enum: eModule })
  name: eModule;

  @Column({ name: 'description' })
  description: string;

  @OneToMany(() => EmployeeEntity, (employee) => employee.role) // Add this line
  employees: EmployeeEntity[];

  @OneToMany(() => PermissionEntity, permission => permission.roleModule)
  permissions: PermissionEntity[];

  constructor(partial: Partial<RoleModuleEntity>) {
    super();
    Object.assign(this, partial);
  }
}
