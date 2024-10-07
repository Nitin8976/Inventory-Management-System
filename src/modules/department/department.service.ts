import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentEntity } from './entity/department.entity';
import { Repository } from 'typeorm';
import { ApiResponseDto } from '../common/dto/response.dto';
import { ErrorMessage } from 'src/utils/error-message';

@Injectable()
export class DepartmentService {
    constructor(
        @InjectRepository(DepartmentEntity)
        private readonly departmentEntityRepository: Repository<DepartmentEntity>) { }

    async createDepartment(createDepartmentDto: CreateDepartmentDto): Promise<ApiResponseDto<DepartmentEntity>> {
        const { name } = createDepartmentDto

        const existingDepartment = await this.departmentEntityRepository.createQueryBuilder('dp')
            .where('dp.isDeleted = :flag AND dp.name = :name', { flag: false, name })
            .getOne();

        if (existingDepartment) {
            throw new BadRequestException(ErrorMessage.alreadyExists);
        }

        const newDepartment = new DepartmentEntity({
            name: createDepartmentDto.name
        })

        await this.departmentEntityRepository.save(newDepartment)

        const department = await this.departmentEntityRepository.findOne({
            where: { name, isDeleted: false },
        })

        return new ApiResponseDto<DepartmentEntity>(
            HttpStatus.CREATED,
            department
        )
    }
}
