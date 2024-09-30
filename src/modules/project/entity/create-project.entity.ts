import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/modules/common/entity/base.entity';
import { EmployeeEntity } from 'src/modules/employee/entity/create-employee.entity';

@Entity({ name: 'projects' })
export class ProjectEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    projectID: string;

    @Column({ name: 'name' })
    name: string;

    @ManyToOne(() => EmployeeEntity, (employee) => employee.projects)
    employee: EmployeeEntity;

    constructor(partial: Partial<ProjectEntity>) {
        super();
        Object.assign(this, partial);
    }
}
