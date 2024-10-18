import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, UseGuards } from '@nestjs/common';
import { PRODUCTS_ROUTES } from 'src/utils/api-routes';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiResponseDto, ListTypeRes } from '../common/dto/response.dto';
import { ProductEntity } from './entity/product.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductFilterDto } from '../common/filter/products-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserAuth } from 'src/common/decorators/user.decorator';
import { iUserAuth } from 'src/common/interfaces/common.interface';

@ApiTags('Products')
@ApiBearerAuth('jwt')
// @UseGuards(PoliciesGuard)
@UseGuards(AuthGuard('jwt'))
@Controller(PRODUCTS_ROUTES.base)
export class ProductsController {

    constructor(
        private readonly productService: ProductsService) { }

    @Get(PRODUCTS_ROUTES.getPRODUCTSList)
    getProductsList(
        @UserAuth() userAuth: iUserAuth,
        @Query() productsFilterDto: ProductFilterDto): Promise<ApiResponseDto<ListTypeRes<ProductEntity>>> {
        return this.productService.getProductsList(productsFilterDto)
    }

    @Post(PRODUCTS_ROUTES.createPRODUCTS)
    createProduct(@Body() createProductDto: CreateProductDto): Promise<ApiResponseDto<ProductEntity>> {
        return this.productService.createProduct(createProductDto)
    }

    @Get(PRODUCTS_ROUTES.getPRODUCTSDetail)
    getProductDetail(@Param('id', ParseUUIDPipe) id: string): Promise<ApiResponseDto<ProductEntity>> {
        return this.productService.getProductDetail(id)
    }


}
