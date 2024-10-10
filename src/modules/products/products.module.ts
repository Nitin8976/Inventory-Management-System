import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { SupplierEntity } from '../suppliers/entity/suppliers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, SupplierEntity])],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule { }
