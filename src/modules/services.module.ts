import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule, BookModule, CategoryModule],
  exports: [],
})
export class ServiceModule {}
