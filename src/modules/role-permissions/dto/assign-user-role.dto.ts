import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class AssignUserRoleDto {
    @ApiProperty({ description: 'Role permissionID', example: 'uuid' })
    @IsNotEmpty({ message: 'Please enter permissionID' })
    @IsUUID('all', { message: 'Invalid permissionID' })
    permissionID: string;

    @ApiProperty({ description: 'userRoleID', example: 'uuid' })
    @IsNotEmpty({ message: 'userRoleID is required' })
    @IsUUID('all', { message: 'Invalid userRoleID' })
    userRoleID: string;
}
