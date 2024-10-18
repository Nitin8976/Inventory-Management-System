import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { Repository } from 'typeorm';
import { ApiResponseDto, ListTypeRes } from '../common/dto/response.dto';
import { SupplierEntity } from '../suppliers/entity/suppliers.entity';
import { ErrorMessage } from 'src/utils/error-message';
import { ProductFilterDto } from '../common/filter/products-filter.dto';

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


    async getProductsList(productsFilterDto: ProductFilterDto): Promise<ApiResponseDto<ListTypeRes<ProductEntity>>> {
        let { search } = productsFilterDto;
        const { page, limit, sortBy, orderBy } = productsFilterDto;
        const { name, supplierId, price, stockQuantity } = productsFilterDto;

        const sortByQuery = {
            createdAt: 'pr.createdAt',
            modifiedAt: 'pr.modifiedAt',
            price: 'pr.price',
            stockQuantity: 'pr.stockQuantity',
            productName: 'pr.name',
            supplier: 'sup.name', // Make sure supplier name is included for sorting if needed
        };

        if (!sortByQuery[sortBy]) {
            throw new NotFoundException(`'${sortBy}' sortBy query ${ErrorMessage.notFound}`);
        }

        const queryBuilder = this.productRepository.createQueryBuilder('pr');

        // Join supplier to get supplier name
        queryBuilder.innerJoinAndSelect('pr.supplier', 'sup', 'sup.isDeleted = :flag', { flag: false });

        queryBuilder.limit(limit);
        queryBuilder.offset(page * limit);
        queryBuilder.orderBy(sortByQuery[sortBy], orderBy);
        queryBuilder.where('pr.isDeleted = :flag', { flag: false });

        // Filtering conditions
        if (name) {
            queryBuilder.andWhere('pr.name = :name', { name });
        }

        if (supplierId) {
            queryBuilder.andWhere('sup.id = :supplierId', { supplierId });
        }

        if (price) {
            queryBuilder.andWhere('pr.price = :price', { price });
        }

        if (stockQuantity) {
            queryBuilder.andWhere('pr.stockQuantity = :stockQuantity', { stockQuantity });
        }

        if (search) {
            queryBuilder.andWhere(`(
                pr.name LIKE :search OR
                sup.name LIKE :search
            )`, { search: `%${search}%` });
        }

        const [count, result] = await Promise.all([
            queryBuilder.getCount(),
            queryBuilder.getMany() // Use getMany to get the entities, including supplier info
        ]);

        return new ApiResponseDto<ListTypeRes<ProductEntity>>(
            HttpStatus.OK,
            {
                count: count,
                records: result
            }
        );
    }

}
