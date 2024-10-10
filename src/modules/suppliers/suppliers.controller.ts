import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SUPPLIER_ROUTES } from 'src/utils/api-routes';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { ApiResponseDto } from '../common/dto/response.dto';
import { SupplierEntity } from './entity/suppliers.entity';
import { ApiParam, ApiTags } from '@nestjs/swagger';


@ApiTags('Suppliers')
@Controller(SUPPLIER_ROUTES.base)
export class SuppliersController {

    constructor(
        private readonly suplliersService: SuppliersService
    ) { }

    @Post(SUPPLIER_ROUTES.createSUPPLIER)
    createSupplier(@Body() createSupplierDto: CreateSupplierDto): Promise<ApiResponseDto<SupplierEntity>> {
        return this.suplliersService.createSupplier(createSupplierDto)
    }


    @ApiParam({ name: 'id', type: 'string', description: 'supplierId' })
    @Get(SUPPLIER_ROUTES.getSUPPLIERDetail)
    getSupplierDetail(@Param('id', ParseUUIDPipe) id: string): Promise<ApiResponseDto<SupplierEntity>> {
        return this.suplliersService.getSupplierDetail(id)
    }
}
