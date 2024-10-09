import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/modules/common/entity/base.entity';
import { UserRoleEntity } from 'src/modules';// Update this path as necessary
import { eUserStatus } from 'src/utils/entities.type';

@Entity({ name: 'identity' })
export class IdentityEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    userID: string; // Unique identifier for the user

    @Column({ name: 'name', length: 100 }) // Length constraint for the name
    name: string; // Name of the user

    @Column({ name: 'email', unique: true }) // Ensure email is unique
    email: string; // Email of the user

    @Column({ name: 'password' }) // Consider applying encryption/hashing to passwords
    password: string; // Password of the user

    @ManyToOne(() => UserRoleEntity, role => role.users, { nullable: true })
    @JoinColumn({ name: 'userRoleID' }) // Foreign key column for the user role
    role?: UserRoleEntity; // Role of the user

    @Column({
        type: 'enum',
        enum: eUserStatus,
        default: eUserStatus.ACTIVE, // Assuming there's an ACTIVE status
    })
    status: eUserStatus; // Status of the user, e.g., ACTIVE, INACTIVE, BANNED

    @ManyToOne(() => IdentityEntity, ({ nullable: true })) // Column name for the manager
    manager?: IdentityEntity;

    constructor(partial: Partial<IdentityEntity>) {
        super();
        Object.assign(this, partial); // Partial initialization using Object.assign
    }

    // Uncomment and use if necessary
    // @Column({ name: 'ms_ID' })
    // msID: string; // Placeholder for any additional identifiers
}

