import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsEmail, IsNumber, IsDate, IsUUID } from 'class-validator';

export class CreateEmployeeDto {
    @ApiProperty({ description: 'The name of the employee.', example: 'John Doe', })
    @IsNotEmpty({ message: 'Please enter name' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'The email of the employee (must be unique).', example: 'john.doe@example.com', })
    @IsNotEmpty({ message: 'Please enter email' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'The position or title of the employee within the company.', example: 'Software Engineer', })
    @IsNotEmpty({ message: 'Please enter position of employee' })
    @IsString()
    position: string;

    @ApiProperty({ description: 'The salary of the employee with up to two decimal places.', example: 75000.50, })
    @IsNotEmpty({ message: 'Please enter salary' })
    @IsNumber({ maxDecimalPlaces: 2 })
    salary: number;

    @ApiProperty({ description: 'The date the employee was hired.', example: '2023-01-15', })
    @IsNotEmpty({ message: 'Please enter hiring date' })
    @IsDate()
    dateOfHire: Date;

    @ApiProperty({ description: 'userRoleID' })
    @IsOptional()
    @IsUUID('all', { message: 'Invalid userRoleID' })
    userRoleID?: string; // Reference to the RoleModuleEntity

    @ApiProperty({ description: 'departmentId' })
    @IsOptional()
    @IsUUID('all', { message: 'Invalid departmentId' })
    departmentId?: string; // Reference to the DepartmentEntity

    @ApiProperty({ description: 'managerId' })
    @IsOptional()
    @IsUUID('all', { message: 'Invalid managerId' })
    managerId?: string; // Reference to the EmployeeEntity for the manager

    @ApiProperty({ description: 'Password for the employee.', example: 'temporary-password' })
    @IsOptional()
    @IsString()
    password?: string;
}
