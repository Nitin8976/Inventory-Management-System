
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponseDto } from 'src/modules/common/dto/response.dto';
import { IdentityEntity, UserRoleEntity } from 'src/modules';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, EntityManager } from 'typeorm';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorMessage } from 'src/utils/error-message';
import * as bcrypt from 'bcrypt';

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
}

