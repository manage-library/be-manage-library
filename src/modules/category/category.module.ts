import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { BookCategoryRepository } from '../book/repository/bookCategory.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryRepository, BookCategoryRepository]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
