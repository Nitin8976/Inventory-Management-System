import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateDepartmentDto {

    @ApiProperty({ description: 'The name of the department (must be unique).', example: 'Human Resources', })
    @IsNotEmpty({ message: 'Please enter name' })
    @IsString()
    name: string;
}
