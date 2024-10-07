import { BadRequestException, flatten, HttpCode, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from './entity/employee.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { ApiResponseDto } from '../common/dto/response.dto';
import { ErrorMessage } from 'src/utils/error-message';
import { DepartmentEntity } from '../department/entity/department.entity';
import { UserRoleEntity } from '../role-permissions/entity/user-role.entity';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import * as bcrypt from 'bcrypt';
import { sendEmail } from 'src/utils/helpers/helper-functions';

@Injectable()
export class EmployeeService {


    constructor(
        @InjectRepository(EmployeeEntity)
        private readonly employeeEntityRepository: Repository<EmployeeEntity>,
        @InjectRepository(UserRoleEntity)
        private readonly userRoleEntityRepository: Repository<UserRoleEntity>,
        @InjectRepository(DepartmentEntity)
        private readonly departmentEntityRepository: Repository<DepartmentEntity>,
    ) { }

    async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<ApiResponseDto<EmployeeEntity>> {
        const { userRoleID, departmentId, managerId, email, password } = createEmployeeDto;

        // Check if role, department, and manager exist in parallel
        const [role, department, manager] = await Promise.all([
            this.userRoleEntityRepository.createQueryBuilder('url')
                .where('url.isDeleted = :flag AND url.userRoleID = :userRoleID', { flag: false, userRoleID })
                .getOne(),

            this.departmentEntityRepository.createQueryBuilder('dp')
                .where('dp.isDeleted = :flag AND dp.departmentId = :departmentId', { flag: false, departmentId })
                .getOne(),

            this.employeeEntityRepository.createQueryBuilder('emp')
                .where('emp.isDeleted = :flag AND emp.employeeID = :managerId', { flag: false, managerId })
                .getOne()
        ]);

        // Validate role, department, and manager
        if (!role) {
            throw new NotFoundException('Role not found');
        }
        if (!department) {
            throw new NotFoundException('Department not found');
        }
        // if (managerId && !manager) {
        //     throw new NotFoundException('Manager not found');
        // }

        // Check if the employee with the provided email already exists
        const isEmployeeExists = await this.employeeEntityRepository.findOne({
            where: { email, isDeleted: false },
        });

        if (isEmployeeExists) {
            throw new BadRequestException(ErrorMessage.alreadyExists);
        }

        // Prevent an employee from being their own manager
        if (managerId === isEmployeeExists?.employeeID) {
            throw new BadRequestException('An employee cannot be their own manager');
        }

        const tempPassword = password || Math.random().toString(36).slice(-8);

        const subject = 'Welcome to Our Company!';
        const text = `Your account has been created. Your temporary password is: ${tempPassword}. Please log in to your account and change your password.`;
        const html = `<h1>Welcome!</h1><p>Your account has been created. Your temporary password is: <strong>${tempPassword}</strong>. Please log in to your account and change your password.</p>`;

        // Send the email with the temporary password
        try {
            await sendEmail(email, subject, text, html);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
        }

        const hashedPassword = await bcrypt.hash(tempPassword, 10); // Hash the password


        // Create new employee entity
        const newEmployee = new EmployeeEntity({
            name: createEmployeeDto.name,
            email: createEmployeeDto.email,
            position: createEmployeeDto.position,
            salary: createEmployeeDto.salary,
            dateOfHire: createEmployeeDto.dateOfHire,
            password: hashedPassword,
            role: role || null,
            department: department || null,
            manager: manager || null,
        });

        // Save the new employee
        await this.employeeEntityRepository.save(newEmployee);

        return new ApiResponseDto<EmployeeEntity>(HttpStatus.CREATED, newEmployee);
    }

    async getEmployeeDetail(employeeID: string): Promise<ApiResponseDto<EmployeeEntity>> {
        const employee = await this.employeeEntityRepository.createQueryBuilder('emp')
            .where('emp.isDeleted = :flag AND emp.employeeID = :employeeID', { flag: false, employeeID })
            .getOne();

        if (!employee) {
            throw new NotFoundException(ErrorMessage.notFound);
        }

        return new ApiResponseDto<EmployeeEntity>(
            HttpStatus.OK,
            employee
        )
    }

    async updateEmployee(updateEmployeeDto: UpdateEmployeeDto): Promise<ApiResponseDto<EmployeeEntity>> {
        // Validate incoming DTO data
        const { employeeID, userRoleID, departmentId, email } = updateEmployeeDto;

        if (!email) {
            throw new BadRequestException('Email is required');
        }

        // Check if the employee exists
        const existingEmployee = await this.employeeEntityRepository.createQueryBuilder('emp')
            .where('emp.isDeleted = :flag', { flag: false })
            .andWhere('emp.employeeID = :employeeID OR (emp.email = :email AND emp.employeeID != :employeeID)', { employeeID, email })
            .getOne();

        if (!existingEmployee) {
            throw new NotFoundException(ErrorMessage.noUserFound);
        }

        // Check if the found employee is the same one being updated or if it's an email conflict
        if (existingEmployee.email === email && existingEmployee.employeeID !== employeeID) {
            throw new BadRequestException(ErrorMessage.alreadyExists);
        }
        // Prevent an employee from being their own manager
        if (updateEmployeeDto.managerId && updateEmployeeDto.managerId === employeeID) {
            throw new BadRequestException('An employee cannot be their own manager');
        }

        const [role, department] = await Promise.all([
            this.userRoleEntityRepository.createQueryBuilder('url')
                .where('url.isDeleted = :flag AND url.userRoleID = :userRoleID', { flag: false, userRoleID })
                .getOne(),

            this.departmentEntityRepository.createQueryBuilder('dp')
                .where('dp.isDeleted = :flag AND dp.departmentId = :departmentId', { flag: false, departmentId })
                .getOne(),
        ])

        // Validate if role and permission exist when provided
        if (!role) {
            throw new NotFoundException(ErrorMessage.notFound);
        }

        if (!department) {
            throw new NotFoundException(ErrorMessage.notFound);
        }
        // Update employee properties dynamically
        Object.assign(existingEmployee, updateEmployeeDto);

        // Save the updated employee
        const employee = await this.employeeEntityRepository.save(existingEmployee);

        return new ApiResponseDto<EmployeeEntity>(HttpStatus.OK, employee);
    }

    async deleteEmployee(employeeId: string): Promise<ApiResponseDto<EmployeeEntity>> {

        const employee = await this.employeeEntityRepository.findOne({
            where: { employeeID: employeeId, isDeleted: false }
        });
        if (!employee) {
            throw new NotFoundException(ErrorMessage.notFound)
        }

        await this.employeeEntityRepository.update({ employeeID: employeeId },
            { isDeleted: true, deletedAt: new Date() })

        return new ApiResponseDto<EmployeeEntity>(
            HttpStatus.OK,
            null
        );
    }

}
