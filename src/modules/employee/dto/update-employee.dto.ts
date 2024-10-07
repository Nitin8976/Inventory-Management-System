import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
    @ApiProperty({ description: 'Employee Id' })
    @IsNotEmpty({ message: 'Please enter employeeID' })
    @IsUUID('all', { message: 'Invalid employeeID' })
    employeeID: string;
}
