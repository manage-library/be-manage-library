import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { ChapterRepository } from './repository/chapter.repository';
import { CategoryRepository } from './../category/category.repository';
import { BookRepository } from './repository/book.repository';
import { Module } from '@nestjs/common';
import { BookCategoryRepository } from './repository/bookCategory.repository';
import { BookController } from './book.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookRepository,
      BookCategoryRepository,
      CategoryRepository,
      ChapterRepository,
    ]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
