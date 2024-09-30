import { PickType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UserLoginDto extends PartialType(PickType(CreateUserDto, ['email', 'password'] as const)) { }
