
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponseDto } from 'src/modules/common/dto/response.dto';
import { IdentityEntity, UserRoleEntity } from 'src/modules';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, EntityManager } from 'typeorm';
import { BadRequestException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ErrorMessage } from 'src/utils/error-message';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dto/login-user.dto';
import { iUserAuth } from 'src/common/interfaces/common.interface';
import { eUserStatus } from 'src/utils/entities.type';
import { sendEmail } from 'src/utils/helpers/helper-functions';

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
            user.isDeleted = :flag
            `, { email: userLoginDto.email, flag: false })
            .getOne();

        if (!user || !bcrypt.compare(userLoginDto.password, user.password)) {
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

    async createUser(createUserDto: CreateUserDto): Promise<ApiResponseDto<IdentityEntity>> {
        const { userRoleID, managerUserID } = createUserDto;
        return await this.dataSource.transaction(async (manager: EntityManager) => {
            // Check if user already exists
            const isUser = await manager.findOne(IdentityEntity, {
                where: { email: createUserDto.email, isDeleted: false }
            });

            if (isUser) {
                throw new BadRequestException(ErrorMessage.duplicateEmail);
            }

            const [role, newManager] = await Promise.all([
                this.userRoleRepository.createQueryBuilder('url')
                    .where('url.isDeleted = :flag AND url.userRoleID = :userRoleID', { flag: false, userRoleID })
                    .getOne(),


                this.userRepository.createQueryBuilder('user')
                    .where('user.isDeleted = :flag AND user.userID = :managerUserID', { flag: false, managerUserID })
                    .getOne()
            ]);

            if (!role) {
                throw new NotFoundException('Role not found');
            }

            if (managerUserID === isUser?.userID) {
                throw new BadRequestException('An employee cannot be their own manager');
            }
            // Generate hashed password
            const tempPassword = createUserDto.password || Math.random().toString(36).slice(-8);

            const subject = 'Welcome to Our Company!';
            const text = `Your account has been created. Your temporary password is: ${tempPassword}. Please log in to your account and change your password.`;
            const html = `<h1>Welcome!</h1><p>Your account has been created. Your temporary password is: <strong>${tempPassword}</strong>. Please log in to your account and change your password.</p>`;

            // Send the email with the temporary password
            try {
                await sendEmail(createUserDto.email, subject, text, html);
                console.log('Email sent successfully');
            } catch (error) {
                throw new BadRequestException('Error sending email:', error);
            }
            // User data
            const newUser = new IdentityEntity({
                name: createUserDto.name,
                password: tempPassword,
                email: createUserDto.email,
                role: role || null,
                manager: newManager || null,
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

            return new ApiResponseDto<IdentityEntity>(
                HttpStatus.CREATED,
                user
            );
        });
    }


}

