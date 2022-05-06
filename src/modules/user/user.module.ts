import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserRepository } from '@src/modules/user/user.repository';
import { UserController } from './user.controller';

const repositories = [UserRepository];

@Module({
  imports: [TypeOrmModule.forFeature(repositories)],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
