import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserRepository } from '@src/modules/user/user.repository';

const repositories = [UserRepository];

@Module({
  imports: [TypeOrmModule.forFeature(repositories)],
  controllers: [],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
