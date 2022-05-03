import { ChapterRepository } from './repository/chapter.repository';
import { CategoryRepository } from './../category/category.repository';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BookRepository } from './repository/book.repository';
import { BookCategoryRepository } from './repository/bookCategory.repository';

@Injectable()
export class BookService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly bookRepository: BookRepository,
    private readonly bookCategoryRepository: BookCategoryRepository,
    private readonly chapterRepository: ChapterRepository,
  ) {}

  async getList() {
    return this.bookRepository.find();
  }

  async getOne({ bookId }) {
    const book = await this.bookRepository.findOne({
      id: bookId,
    });

    if (!book) {
      throw new HttpException(
        {
          context: '',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create({
    name,
    description,
    releaseStatus,
    censorshipStatus,
    isVisible,
    authorId,
    categoryIds,
    chapters,
  }) {
    const book = await this.bookRepository.findOne({
      name,
    });

    if (book) {
      return new HttpException(
        {
          context: '',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const categories = await this.categoryRepository.findByIds(categoryIds);

    if (categoryIds.length !== categories.length) {
      return new HttpException(
        {
          context: '',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newBook = await this.bookRepository.save({
      name,
      description,
      release_status: releaseStatus,
      censorship_status: censorshipStatus,
      is_visible: isVisible,
      author_id: authorId,
    });

    await this.bookCategoryRepository.save(
      categoryIds.map((categoryId: number) => ({
        category_id: categoryId,
        book_id: newBook.id,
      })),
    );

    await this.chapterRepository.save(
      chapters.map((chapter) => ({ ...chapter, book_id: newBook.id })),
    );
  }

  async update({
    bookId,
    name,
    description,
    releaseStatus,
    censorshipStatus,
    isVisible,
    categoryIds,
  }) {
    if (categoryIds && categoryIds.length) {
      await this.bookCategoryRepository.delete({
        book_id: bookId,
      });

      await this.bookCategoryRepository.save(
        categoryIds.map((categoryId) => ({
          category_id: categoryId,
          book_id: bookId,
        })),
      );
    }

    await this.bookRepository.save({
      id: bookId,
      name,
      description,
      status,
      is_visible: isVisible,
      censorship_status: censorshipStatus,
      release_status: releaseStatus,
    });
  }
}
