import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRoleDto {
    @ApiProperty({ description: 'Role title' })
    @IsNotEmpty({ message: 'Please enter title' })
    title: string;

    @ApiProperty({ description: 'Role description' })
    @IsNotEmpty({ message: 'Please enter description' })
    description: string;
}
