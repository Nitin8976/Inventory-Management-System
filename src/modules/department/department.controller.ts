import { Body, Controller, Post } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { ApiResponseDto } from '../common/dto/response.dto';
import { DepartmentEntity } from './entity/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DEPARTMENT_ROUTES } from 'src/utils/api-routes';

@Controller(DEPARTMENT_ROUTES.base)
export class DepartmentController {
    constructor(
        private readonly departmentService: DepartmentService
    ) { }

    @Post(DEPARTMENT_ROUTES.createDepartment)
    createDepartment(@Body() createDepartmentDto: CreateDepartmentDto): Promise<ApiResponseDto<DepartmentEntity>> {
        return this.departmentService.createDepartment(createDepartmentDto);
    }

}
