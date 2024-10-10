import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplierEntity } from './entity/suppliers.entity';
import { ApiResponseDto } from '../common/dto/response.dto';
import { ErrorMessage } from 'src/utils/error-message';

@Injectable()
export class SuppliersService {

    constructor(
        @InjectRepository(SupplierEntity)
        private readonly suplliersRepository: Repository<SupplierEntity>
    ) { }



    async createSupplier(createSupplierDto: CreateSupplierDto): Promise<ApiResponseDto<SupplierEntity>> {
        const isSupplier = await this.suplliersRepository.findOne({
            where: { email: createSupplierDto.email, isDeleted: false }
        });

        if (isSupplier) {
            throw new BadRequestException(ErrorMessage.duplicateEmail)
        }

        const newSupplier = new SupplierEntity({
            name: createSupplierDto.name,
            email: createSupplierDto.email,
            contactInfo: createSupplierDto.contactInfo,
            address: createSupplierDto.address,
        })

        const supplier = await this.suplliersRepository.save(newSupplier)

        return new ApiResponseDto<SupplierEntity>(
            HttpStatus.CREATED,
            supplier
        )
    }

    async getSupplierDetail(id: string): Promise<ApiResponseDto<SupplierEntity>> {
        const supplier = await this.suplliersRepository.findOne({
            where: { id, isDeleted: false },
            relations: ['products']
        })

        if (!supplier) {
            throw new NotFoundException(ErrorMessage.notFound)
        }

        return new ApiResponseDto<SupplierEntity>(
            HttpStatus.OK, supplier
        )
    }
}
