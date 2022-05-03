import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UserRepository } from '@src/modules/user/user.repository';

import { JwtStrategy } from '@src/guards/jwt.strategy';
import { JwtGuard } from '@src/guards/jwt.guard';
import { ACCESS_TOKEN_SECRET } from './../../constants/EnvKey';

const repositories = [UserRepository];

@Module({
  imports: [
    TypeOrmModule.forFeature(repositories),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(ACCESS_TOKEN_SECRET),
        signOptions: { expiresIn: configService.get(ACCESS_TOKEN_SECRET) },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtGuard],
})
export class AuthModule {}
