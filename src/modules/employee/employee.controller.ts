import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { ApiResponseDto } from '../common/dto/response.dto';
import { EmployeeEntity } from './entity/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EMPLOYEE_ROUTES } from 'src/utils/api-routes';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { PoliciesGuard } from 'src/auth/guards/policy.guard';
import { AuthGuard } from '@nestjs/passport';
import { UserAuth } from 'src/common/decorators/user.decorator';
import { iUserAuth } from 'src/common/interfaces/common.interface';

@ApiTags('Employee')
@ApiBearerAuth('jwt')
@UseGuards(PoliciesGuard)
@UseGuards(AuthGuard('jwt'))
@Controller(EMPLOYEE_ROUTES.base)
export class EmployeeController {
    constructor(private employeeService: EmployeeService) { }

    @Post(EMPLOYEE_ROUTES.createEmployee)
    async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto): Promise<ApiResponseDto<EmployeeEntity>> {
        return this.employeeService.createEmployee(createEmployeeDto)
    }

    @Get(EMPLOYEE_ROUTES.getEmployeeDetail)
    async getEmployeeDetail(@Param('id', ParseUUIDPipe) employeeID: string): Promise<ApiResponseDto<EmployeeEntity>> {
        return this.employeeService.getEmployeeDetail(employeeID)
    }

    @Put(EMPLOYEE_ROUTES.updateEmployee)
    async updateEmployee(@UserAuth() userAuth: iUserAuth, @Body() updateEmployeeDto: UpdateEmployeeDto): Promise<ApiResponseDto<EmployeeEntity>> {
        return this.employeeService.updateEmployee(updateEmployeeDto)
    }


    @ApiParam({ name: 'id', type: 'string', description: 'employeeId' })
    @Delete(EMPLOYEE_ROUTES.deleteEmployee)
    async deleteEmployee(
        @UserAuth() userAuth: iUserAuth,
        @Param('id', ParseUUIDPipe) employeeId: string): Promise<ApiResponseDto<EmployeeEntity>> {
        return this.employeeService.deleteEmployee(employeeId)
    }
}
