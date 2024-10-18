import { IsOptional, IsUUID, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '../dto/pagination.dto';

export class ProductFilterDto extends PaginationDto {
    @ApiProperty({ description: 'Product name', required: false })
    @IsOptional()
    @IsString({ message: 'Product name must be a string' })
    name?: string;

    @ApiProperty({ description: 'Product description', required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ description: 'Product price', required: false })
    @IsOptional()
    @IsNumber({}, { message: 'Price must be a number' })
    price?: number;

    @ApiProperty({ description: 'Stock quantity', required: false })
    @IsOptional()
    @IsNumber({}, { message: 'Stock quantity must be a number' })
    stockQuantity?: number;

    @ApiProperty({ description: 'SupplierID', required: false })
    @IsUUID('all', { message: 'Invalid Supplier ID' })  // Ensure it's a valid UUID
    @IsOptional()
    supplierId?: string;
}
