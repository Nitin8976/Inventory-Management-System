import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/modules/common/entity/base.entity';
import { UserRoleEntity } from 'src/modules';

@Entity({ name: 'identity' })
export class IdentityEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    userID: string;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'email' })
    email: string;

    @Column({ name: 'password' })
    password: string;

    @Column({ name: 'new_account_tour', default: false })
    newAccountTour: boolean;

    @ManyToOne(() => UserRoleEntity, role => role.users, { nullable: true })
    @JoinColumn({ name: 'userRoleID' })
    role?: UserRoleEntity;

    constructor(partial: Partial<IdentityEntity>) {
        super();
        Object.assign(this, partial);
    }

    // @Column({ name: 'ms_ID' })
    // msID: string; oid
}
