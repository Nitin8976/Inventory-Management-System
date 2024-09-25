import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsUUID, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ description: 'User name', example: 'Dude' })
    @IsNotEmpty({ message: 'Please enter name' })
    name: string;

    @ApiProperty({ description: 'User email', example: 'dude@softobiz.com' })
    @IsEmail({}, { message: 'Please enter a valid email' })
    email: string;

    @ApiProperty({ description: 'userRoleID', example: null })
    @IsOptional()
    @IsUUID('all', { message: 'Invalid userRoleID' })
    userRoleID?: string | null;

    @ApiProperty({ description: 'User password', example: 'Welcome@1' })
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    })
    password: string;
}
