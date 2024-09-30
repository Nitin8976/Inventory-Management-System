import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AUTH_ROUTES } from 'src/utils/api-routes';
import { ApiResponseDto } from 'src/modules/common/dto/response.dto';
import { IdentityEntity } from 'src/modules';
import { CreateUserDto } from './dto/create-user.dto';

@Controller(AUTH_ROUTES.base)
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post(AUTH_ROUTES.register)
    userRegister(@Body() createUserDto: CreateUserDto): Promise<ApiResponseDto<IdentityEntity>> {
        return this.authService.userRegister(createUserDto)
    }
}
