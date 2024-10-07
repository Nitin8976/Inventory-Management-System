import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EmployeeEntity } from 'src/modules/employee/entity/employee.entity';
import { BaseEntity } from 'src/modules/common/entity/base.entity';

@Entity({ name: 'departments' })
export class DepartmentEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    departmentID: string;

    @Column({ name: 'name', unique: true })
    name: string;

    @OneToMany(() => EmployeeEntity, (employee) => employee.department)
    employees: EmployeeEntity[];

    constructor(partial: Partial<DepartmentEntity>) {
        super();
        Object.assign(this, partial);
    }
}
