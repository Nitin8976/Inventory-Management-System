import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { SupplierEntity } from './entity/suppliers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierEntity])],
  providers: [SuppliersService],
  controllers: [SuppliersController]
})
export class SuppliersModule { }
