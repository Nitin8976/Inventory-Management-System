import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentityEntity, UserRoleEntity } from 'src/modules';
import { JwtModule } from '@nestjs/jwt';
import { CONSTANTS } from 'src/common/constants';

@Module({
  imports: [
    JwtModule.register({
      secret: CONSTANTS.jwtSecretKey,
      signOptions: { expiresIn: '1d' }
    }),
    TypeOrmModule.forFeature([
      IdentityEntity,
      UserRoleEntity
    ])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
