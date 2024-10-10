import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSupplierDto {
    @ApiProperty({ description: 'Supplier name', example: 'ABC Supplies' })
    @IsNotEmpty({ message: 'Supplier name is required' })
    @IsString()
    @MaxLength(100, { message: 'Supplier name must be at most 100 characters long' })
    name: string; // Supplier name

    @ApiProperty({ description: 'Supplier contact information', example: '123-456-7890' })
    @IsNotEmpty({ message: 'Contact information is required' })
    @IsString()
    contactInfo: string; // Supplier contact information

    @ApiProperty({ description: 'Supplier address', example: '123 Supplier St, City, Country' })
    @IsNotEmpty({ message: 'Address is required' })
    @IsString()
    @MaxLength(255, { message: 'Address must be at most 255 characters long' })
    address: string; // Supplier address

    @ApiProperty({ description: 'Supplier email', example: 'supplier@example.com' })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Please provide a valid email' })
    email: string; // Supplier email
}
