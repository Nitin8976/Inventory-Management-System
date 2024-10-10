import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ description: 'Product name', example: 'Widget A' })
    @IsNotEmpty({ message: 'Product name is required' })
    @IsString()
    @MaxLength(100, { message: 'Product name must be at most 100 characters long' })
    name: string; // Product name

    @ApiProperty({ description: 'Product description', example: 'High-quality widget for various uses' })
    @IsOptional()
    @IsString()
    description?: string; // Product description (optional)

    @ApiProperty({ description: 'Product price', example: 19.99 })
    @IsNotEmpty({ message: 'Price is required' })
    @IsNumber({}, { message: 'Price must be a number' })
    price: number; // Product price

    @ApiProperty({ description: 'Stock quantity', example: 100 })
    @IsNotEmpty({ message: 'Stock quantity is required' })
    @IsNumber({}, { message: 'Stock quantity must be a number' })
    stockQuantity: number; // Stock quantity

    @ApiProperty({ description: 'Supplier ID', example: 'UUID' })
    @IsNotEmpty({ message: 'Supplier ID is required' })
    @IsString()
    supplierId: string; // Supplier ID (references `SupplierEntity`)
}
