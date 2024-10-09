import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/modules/common/entity/base.entity'; // Assuming you have a base entity
import { ProductEntity } from 'src/modules/products/entity/product.entity'; // Import the ProductEntity

@Entity({ name: 'suppliers' })
export class SupplierEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string; // Unique identifier for the supplier

    @Column({ name: 'name', length: 100 })
    name: string; // Supplier name

    @Column({ name: 'contact_info', type: 'text' })
    contactInfo: string; // Supplier contact information

    @Column({ name: 'address', type: 'text' })
    address: string; // Supplier address

    @Column({ name: 'email', unique: true })
    email: string; // Supplier email

    @OneToMany(() => ProductEntity, (product) => product.supplier)
    products: ProductEntity[]; // Reference to the products supplied by this supplier

    constructor(partial: Partial<SupplierEntity>) {
        super();
        Object.assign(this, partial);
    }
}
