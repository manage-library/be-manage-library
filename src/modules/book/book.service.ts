import { ChapterService } from './../chapter/chapter.service';
import { HistoryService } from './../history/history.service';
import { ECensorshipStatus } from './../../common/enums/index';
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
    private readonly historyService: HistoryService,
    private readonly chapterService: ChapterService,
  ) {}

  async getList() {
    return this.bookRepository
      .createQueryBuilder('book')
      .leftJoin('book.author', 'author')
      .leftJoin('book.bookCategory', 'bookCategory')
      .leftJoin('bookCategory.category', 'category')
      .loadRelationCountAndMap('book.countChapter', 'book.chapters')
      .select([
        'book.id',
        'book.name',
        'book.description',
        'book.is_vip',
        'book.release_status',
        'author.id',
        'author.full_name',
        'bookCategory.category_id',
        'category.id',
        'category.name',
      ])
      .getMany();
  }

  async getOne({ userId, bookId }) {
    const book = await this.bookRepository
      .createQueryBuilder('book')
      .leftJoin('book.author', 'author')
      .leftJoin('book.chapters', 'chapters')
      .leftJoin('book.bookCategory', 'bookCategory')
      .leftJoin('bookCategory.category', 'category')
      .loadRelationCountAndMap('book.countChapter', 'book.chapters')
      .select([
        'book.id',
        'book.name',
        'book.description',
        'book.is_vip',
        'book.release_status',
        'author.id',
        'author.full_name',
        'chapters.id',
        'chapters.name',
        'bookCategory.category_id',
        'category.id',
        'category.name',
      ])
      .where('book.id = :bookId', { bookId })
      .getOne();

    if (!book) {
      throw new HttpException(
        {
          context: '',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.historyService.update({
      userId,
      bookId,
      chapterId: null,
    });

    return book;
  }

  async create({
    name,
    description,
    releaseStatus,
    isVisible,
    isVip,
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
      censorship_status: ECensorshipStatus.PENDING,
      is_vip: isVip,
      is_visible: isVisible,
      author_id: authorId,
    });

    await this.bookCategoryRepository.save(
      categoryIds.map((categoryId: number) => ({
        category_id: categoryId,
        book_id: newBook.id,
      })),
    );

    await this.chapterService.create({ bookId: newBook.id, chapters });
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
    if (categoryIds) {
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

    await this.bookRepository.update(
      { id: bookId },
      {
        name,
        description,
        is_visible: isVisible,
        censorship_status: censorshipStatus,
        release_status: releaseStatus,
      },
    );
  }
}
