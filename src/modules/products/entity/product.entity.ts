import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/modules/common/entity/base.entity'; // Assuming you have a base entity
import { SupplierEntity } from 'src/modules/suppliers/entity/suppliers.entity';// Import the SupplierEntity

@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string; // Unique identifier for the product

    @Column({ name: 'name', length: 100 })
    name: string; // Product name

    @Column({ name: 'description', type: 'text', nullable: true })
    description: string; // Product description

    @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2 })
    price: number; // Product price

    @Column({ name: 'stock_quantity', type: 'int', default: 0 })
    stockQuantity: number; // Available stock quantity

    @ManyToOne(() => SupplierEntity, (supplier) => supplier.products, { nullable: false })
    supplier: SupplierEntity; // Reference to the SupplierEntity

    constructor(partial: Partial<ProductEntity>) {
        super();
        Object.assign(this, partial);
    }
}
