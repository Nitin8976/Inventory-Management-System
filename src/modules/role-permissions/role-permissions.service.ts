import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { ApiResponseDto, ListTypeRes } from '../common/dto/response.dto';
import { UserRoleEntity } from '..';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssignUserRoleDto } from './dto/assign-user-role.dto';
import { ErrorMessage } from 'src/utils/error-message';
import { PaginationDto } from '../common/dto/pagination.dto';
import { PermissionEntity } from './entity/permissions.entity';

@Injectable()
export class RolePermissionsService {

    constructor(
        @InjectRepository(UserRoleEntity)
        private readonly userRoleEntityRepository: Repository<UserRoleEntity>,
        @InjectRepository(PermissionEntity)
        private readonly permissionEntityRepository: Repository<PermissionEntity>
    ) { }


    async createUserRole(createUserRoleDto: CreateUserRoleDto): Promise<ApiResponseDto<UserRoleEntity>> {
        const newUserRole = new UserRoleEntity({
            title: createUserRoleDto.title,
            description: createUserRoleDto.description
        })
        await this.userRoleEntityRepository.save(newUserRole)

        const queryBuilder = this.userRoleEntityRepository.createQueryBuilder('uRole')
        queryBuilder.where('uRole.isDeleted = :flag AND uRole.userRoleID = :id', { flag: false, id: newUserRole.userRoleID })

        const userRole = await queryBuilder.getOne()

        return new ApiResponseDto<UserRoleEntity>(
            HttpStatus.CREATED,
            userRole
        )

    }


    async assignUserRole(assignUserRoleDto: AssignUserRoleDto): Promise<ApiResponseDto<UserRoleEntity>> {
        const [modulePermission, role] = await Promise.all([
            this.permissionEntityRepository.findOne({
                where: { permissionID: assignUserRoleDto.permissionID, isDeleted: false }
            }),
            this.userRoleEntityRepository.findOne({
                where: { userRoleID: assignUserRoleDto.userRoleID, isDeleted: false },
                relations: ['rolePermissions']
            })
        ]);

        if (!modulePermission) {
            throw new BadRequestException(ErrorMessage.noRecordFound);
        }

        // Assign permission to user role
        const newUserRole = new UserRoleEntity({
            userRoleID: assignUserRoleDto.userRoleID,
            rolePermissions: [...role.rolePermissions, modulePermission],
        });

        await this.userRoleEntityRepository.save(newUserRole);

        // Get user role details
        const queryBuilder = this.userRoleEntityRepository.createQueryBuilder('uRole');
        queryBuilder.innerJoinAndSelect('uRole.rolePermissions', 'rolePerm', 'uRole.isDeleted = :flag', { flag: false });
        queryBuilder.where('uRole.isDeleted = :flag AND uRole.userRoleID = :id', { flag: false, id: assignUserRoleDto.userRoleID });

        const userRole = await queryBuilder.getOne();

        return new ApiResponseDto<UserRoleEntity>(
            HttpStatus.CREATED,
            userRole
        );
    }
    async unAssignUserRole(assignUserRoleDto: AssignUserRoleDto): Promise<ApiResponseDto<UserRoleEntity>> {
        const role = await this.userRoleEntityRepository.findOne({
            where: { userRoleID: assignUserRoleDto.userRoleID, isDeleted: false },
            relations: ['rolePermissions']
        });

        if (!role) {
            throw new BadRequestException(ErrorMessage.noRecordFound);
        }

        // Un-assign permission to user role
        const newUserRole = new UserRoleEntity({
            userRoleID: assignUserRoleDto.userRoleID,
            rolePermissions: role.rolePermissions.filter((permission) => permission.permissionID !== assignUserRoleDto.permissionID)
        });

        await this.userRoleEntityRepository.save(newUserRole);

        // Get user role details
        const queryBuilder = this.userRoleEntityRepository.createQueryBuilder('uRole');
        queryBuilder.leftJoinAndSelect('uRole.rolePermissions', 'rolePerm', 'uRole.isDeleted = :flag', { flag: false });
        queryBuilder.where('uRole.isDeleted = :flag AND uRole.userRoleID = :id', { flag: false, id: assignUserRoleDto.userRoleID });

        const userRole = await queryBuilder.getOne();

        return new ApiResponseDto<UserRoleEntity>(
            HttpStatus.OK,
            userRole
        );
    }

    async getUserRoleList(paginationDto: PaginationDto): Promise<ApiResponseDto<ListTypeRes<UserRoleEntity>>> {
        const { page, limit, sortBy, orderBy, search } = paginationDto;
        const queryBuilder = this.userRoleEntityRepository.createQueryBuilder('uRole');

        queryBuilder.skip(page * limit);
        queryBuilder.take(limit);
        queryBuilder.orderBy(`uRole.${sortBy}`, orderBy);
        queryBuilder.where('uRole.isDeleted = :flag', { flag: false });

        if (search) {
            queryBuilder.andWhere(`(
            uRole.title LIKE :search OR
            uRole.description LIKE :search
            )`,
                { search: `%${search}%` });
        }

        const result = await queryBuilder.getManyAndCount();

        return new ApiResponseDto<ListTypeRes<UserRoleEntity>>(
            HttpStatus.OK,
            {
                count: result[1],
                records: result[0]
            }
        );
    }

}
