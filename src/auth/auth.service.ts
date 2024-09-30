
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponseDto } from 'src/modules/common/dto/response.dto';
import { IdentityEntity, UserRoleEntity } from 'src/modules';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, EntityManager } from 'typeorm';
import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ErrorMessage } from 'src/utils/error-message';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dto/login-user.dto';
import { iUserAuth } from 'src/common/interfaces/common.interface';
import { eUserStatus } from 'src/utils/entities.type';

@Injectable()
export class AuthService {

    constructor(
        private readonly dataSource: DataSource,
        private readonly jwtService: JwtService,
        @InjectRepository(IdentityEntity)
        private readonly userRepository: Repository<IdentityEntity>,
        @InjectRepository(UserRoleEntity)
        private readonly userRoleRepository: Repository<UserRoleEntity>,
    ) { }

    async parseUserDetail(payload: iUserAuth): Promise<iUserAuth> {
        const queryBuilder = this.userRepository.createQueryBuilder('user');
        queryBuilder.leftJoinAndSelect('user.role', 'role', 'role.isDeleted = :flag', { flag: false });
        queryBuilder.leftJoinAndSelect('role.rolePermissions', 'rPerm', 'rPerm.isDeleted = :flag', { flag: false });
        queryBuilder.leftJoinAndSelect('rPerm.roleModule', 'rModule', 'rModule.isDeleted = :flag', { flag: false });
        queryBuilder.where('user.isDeleted = :flag AND user.userID = :userID', { flag: false, userID: payload.userID });
        const user = await queryBuilder.getOne();

        if (user) {
            payload['permissions'] = user?.role?.rolePermissions?.map((item) => {
                return {
                    type: item.type,
                    module: item.roleModule.name
                }
            }) || [];
        }

        return payload;
    }

    async userRegister(createUserDto: CreateUserDto): Promise<ApiResponseDto<IdentityEntity>> {
        return await this.dataSource.transaction(async (manager: EntityManager) => {
            // Check if user already exists
            const isUser = await manager.findOne(IdentityEntity, {
                where: { email: createUserDto.email, isDeleted: false }
            });

            if (isUser) {
                throw new BadRequestException(ErrorMessage.duplicateEmail);
            }

            // Generate hashed password
            const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

            // User data
            const newUser = new IdentityEntity({
                name: createUserDto.name,
                password: hashedPassword,
                email: createUserDto.email,
            });

            if (createUserDto.userRoleID) {
                const userRole = await manager.findOne(UserRoleEntity, {
                    where: { userRoleID: createUserDto.userRoleID, isDeleted: false },
                    relations: ['rolePermissions'], // Fetch related permissions
                });

                if (!userRole) {
                    throw new BadRequestException(ErrorMessage.noRecordFound);
                }

                newUser.role = userRole;
            }

            // Save the user
            await manager.save(IdentityEntity, newUser);

            // Use QueryBuilder within the transaction to fetch user, role, and permissions
            const queryBuilder = manager.createQueryBuilder(IdentityEntity, 'user');
            queryBuilder
                .leftJoinAndSelect('user.role', 'role', 'role.isDeleted = :flag', { flag: false }) // Join user role
                .leftJoinAndSelect('role.rolePermissions', 'permissions', 'permissions.isDeleted = :flag', { flag: false })
                .where('user.isDeleted = :flag AND user.userID = :id', { flag: false, id: newUser.userID }); // Fetch specific user

            const user = await queryBuilder.getOne(); // Fetch specific user

            const payload = {
                ...user,
                token: this.jwtService.sign({
                    name: user.name,
                    email: user.email,
                    userID: user.userID,
                }),
            };

            return new ApiResponseDto<IdentityEntity>(
                HttpStatus.CREATED,
                payload
            );
        });
    }

    async userLogin(userLoginDto: UserLoginDto): Promise<ApiResponseDto<IdentityEntity>> {
        const user = await this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.role', 'role', 'role.isDeleted = :flag', { flag: false })
            .leftJoinAndSelect('role.rolePermissions', 'rPerm', 'rPerm.isDeleted = :flag', { flag: false })
            .where(`
            user.email = :email AND
            user.status = :status AND
            user.isDeleted = :flag
            `, { email: userLoginDto.email, status: eUserStatus.ACTIVE, flag: false })
            .getOne();

        if (!user || !bcrypt.compareSync(userLoginDto.password, user.password)) {
            throw new UnauthorizedException('User name or password invalid.');
        };

        const payload = {
            ...user,
            token: this.jwtService.sign({
                name: user.name,
                email: user.email,
                userID: user.userID,
            })
        }

        return new ApiResponseDto<IdentityEntity>(
            HttpStatus.OK,
            payload
        );
    }


}

