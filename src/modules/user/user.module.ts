import { FileModule } from './../file/file.module';
import { BookRepository } from './../book/repository/book.repository';
import { TransactionModule } from './../transaction/transaction.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserRepository } from '@src/modules/user/user.repository';
import { UserController } from './user.controller';

const repositories = [UserRepository, BookRepository];

@Module({
  imports: [
    TypeOrmModule.forFeature(repositories),
    TransactionModule,
    FileModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
