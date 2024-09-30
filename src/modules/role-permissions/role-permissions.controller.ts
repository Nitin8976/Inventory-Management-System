import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiResponseDto, ListTypeRes } from '../common/dto/response.dto';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { RolePermissionsService } from './role-permissions.service';
import { ROLE_PERMISSION_ROUTES } from 'src/utils/api-routes'
import { UserRoleEntity } from './entity/user-role.entity';
import { AssignUserRoleDto } from './dto/assign-user-role.dto';
import { PaginationDto } from '../common/dto/pagination.dto';


@Controller(ROLE_PERMISSION_ROUTES.base)
export class RolePermissionsController {
    constructor(
        private readonly rolePermissionService: RolePermissionsService
    ) { }

    @Post(ROLE_PERMISSION_ROUTES.createUserRole)
    createUserRole(@Body() createUserRoleDto: CreateUserRoleDto): Promise<ApiResponseDto<UserRoleEntity>> {
        return this.rolePermissionService.createUserRole(createUserRoleDto)
    }

    // Assign role to user
    @Post(ROLE_PERMISSION_ROUTES.assignUserRole)
    assignUserRole(@Body() assignUserRoleDto: AssignUserRoleDto): Promise<ApiResponseDto<UserRoleEntity>> {
        return this.rolePermissionService.assignUserRole(assignUserRoleDto);
    }

    // Un-assign role from user
    @Post(ROLE_PERMISSION_ROUTES.unAssignUserRole)
    unAssignUserRole(@Body() assignUserRoleDto: AssignUserRoleDto): Promise<ApiResponseDto<UserRoleEntity>> {
        return this.rolePermissionService.unAssignUserRole(assignUserRoleDto);
    }

    @Get(ROLE_PERMISSION_ROUTES.getUserRoleList)
    getUserRoleList(@Query() paginationDto: PaginationDto): Promise<ApiResponseDto<ListTypeRes<UserRoleEntity>>> {
        return this.rolePermissionService.getUserRoleList(paginationDto);
    }


}
