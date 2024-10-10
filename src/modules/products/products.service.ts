import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { Repository } from 'typeorm';
import { ApiResponseDto } from '../common/dto/response.dto';
import { SupplierEntity } from '../suppliers/entity/suppliers.entity';
import { ErrorMessage } from 'src/utils/error-message';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        @InjectRepository(SupplierEntity)
        private readonly suplliersRepository: Repository<SupplierEntity>
    ) { }

    async createProduct(createProductDto: CreateProductDto): Promise<ApiResponseDto<ProductEntity>> {

        const isProduct = await this.productRepository.findOne({
            where: { name: createProductDto.name, isDeleted: false }
        });

        const supplier = await this.suplliersRepository.findOne({
            where: { id: createProductDto.supplierId, isDeleted: false }
        })

        if (isProduct) {
            // If the product exists, update its stock quantity
            isProduct.stockQuantity += createProductDto.stockQuantity;
            await this.productRepository.save(isProduct);
        } else {
            // Create a new product entity if it does not exist
            const newProduct = new ProductEntity({
                name: createProductDto.name,
                description: createProductDto.description,
                price: createProductDto.price,
                stockQuantity: createProductDto.stockQuantity,
                supplier: supplier// Assuming you're passing supplierId
            });

            const product = await this.productRepository.save(newProduct)

            return new ApiResponseDto<ProductEntity>(
                HttpStatus.CREATED,
                product
            )
        }
    }

    async getProductDetail(id: string): Promise<ApiResponseDto<ProductEntity>> {
        const product = await this.productRepository.findOne({
            where: { id, isDeleted: false },
            relations: ['supplier']
        })

        if (!product) {
            throw new NotFoundException(ErrorMessage.notFound)
        }

        return new ApiResponseDto<ProductEntity>(
            HttpStatus.OK, product
        )
    }

}
