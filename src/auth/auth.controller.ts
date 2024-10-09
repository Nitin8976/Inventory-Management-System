import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AUTH_ROUTES } from 'src/utils/api-routes';
import { ApiResponseDto } from 'src/modules/common/dto/response.dto';
import { IdentityEntity } from 'src/modules';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller(AUTH_ROUTES.base)
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post(AUTH_ROUTES.register)
    userRegister(@Body() createUserDto: CreateUserDto): Promise<ApiResponseDto<IdentityEntity>> {
        return this.authService.userRegister(createUserDto)
    }

    @Post(AUTH_ROUTES.login)
    userLogin(@Body() userLoginDto: UserLoginDto): Promise<ApiResponseDto<IdentityEntity>> {
        return this.authService.userLogin(userLoginDto)
    }

    // @UseGuards(AuthGuard('jwt'))
    @Post(AUTH_ROUTES.create)
    createUser(@Body() createUserDto: CreateUserDto): Promise<ApiResponseDto<IdentityEntity>> {
        return this.authService.createUser(createUserDto)
    }

}

