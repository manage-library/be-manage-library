import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { CategoryRepository } from './../category/category.repository';
import { BookRepository } from './repository/book.repository';
import { Module } from '@nestjs/common';
import { BookCategoryRepository } from './repository/bookCategory.repository';
import { BookController } from './book.controller';
import { HistoryModule } from '../history/history.module';
import { ChapterModule } from '../chapter/chapter.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookRepository,
      BookCategoryRepository,
      CategoryRepository,
    ]),
    ChapterModule,
    HistoryModule,
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
