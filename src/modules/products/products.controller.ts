import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { PRODUCTS_ROUTES } from 'src/utils/api-routes';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiResponseDto } from '../common/dto/response.dto';
import { ProductEntity } from './entity/product.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller(PRODUCTS_ROUTES.base)
export class ProductsController {

    constructor(
        private readonly productService: ProductsService) { }

    @Post(PRODUCTS_ROUTES.createPRODUCTS)
    createProduct(@Body() createProductDto: CreateProductDto): Promise<ApiResponseDto<ProductEntity>> {
        return this.productService.createProduct(createProductDto)
    }

    @Get(PRODUCTS_ROUTES.getPRODUCTSDetail)
    getProductDetail(@Param('id', ParseUUIDPipe) id: string): Promise<ApiResponseDto<ProductEntity>> {
        return this.productService.getProductDetail(id)
    }

}
