import { RateRepository } from './../rate/rate.repository';
import { ChapterRepository } from './../chapter/chapter.repository';
import { ChapterEntity } from '@src/modules/chapter/chapter.entity';
import { UserEntity } from '@src/modules/user/user.entity';
import { QueryBookDto } from './dto/book.dto';
import { EReleaseStatus, ESortBy, ESortType } from '@src/common/enums';
import { CategoryService } from './../category/category.service';
import { ChapterService } from './../chapter/chapter.service';
import { HistoryService } from './../history/history.service';
import { CategoryRepository } from './../category/category.repository';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { jsPDF } from 'jspdf';
import { BookRepository } from './repository/book.repository';
import { BookCategoryRepository } from './repository/bookCategory.repository';
import { Brackets } from 'typeorm';
import { removeNullProperty } from '@src/common/helpers/utils.helper';
/* eslint-disable @typescript-eslint/no-var-requires */
const cheerio = require('cheerio');
const axios = require('axios');

@Injectable()
export class BookService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly bookRepository: BookRepository,
    private readonly chapterRepository: ChapterRepository,
    private readonly bookCategoryRepository: BookCategoryRepository,
    private readonly historyService: HistoryService,
    private readonly chapterService: ChapterService,
    private readonly categoryService: CategoryService,
    private readonly rateRepository: RateRepository,
  ) {}

  async getList({ query, userId }: { query: QueryBookDto; userId: number }) {
    const bookQueryBuilder = this.bookRepository
      .createQueryBuilder('book')
      .leftJoin('book.author', 'author')
      .leftJoin('book.bookCategory', 'bookCategory')
      .leftJoin('bookCategory.category', 'category')
      .loadRelationCountAndMap('book.isLike', 'book.likes', 'likes', (qb) =>
        qb.where('likes.user_id = :userId', { userId }),
      )
      .loadRelationCountAndMap('book.countChapter', 'book.chapters')
      .loadRelationCountAndMap('book.countView', 'book.histories')
      .loadRelationCountAndMap('book.countLike', 'book.likes')
      .loadRelationCountAndMap('book.countDownload', 'book.downloads')
      .select([
        'book.id',
        'book.name',
        'book.description',
        'book.author_description',
        'book.image',
        'book.is_vip',
        'book.release_status',
        'author.id',
        'author.full_name',
        'bookCategory.category_id',
        'category.id',
        'category.name',
      ])
      .where('book.is_visible = :isVisible', { isVisible: true });

    bookQueryBuilder.andWhere(
      new Brackets((qb) => {
        if (query.bookName) {
          qb.where('book.name like :bookName', {
            bookName: `%${query.bookName || ''}%`,
          });
        }

        if (query.authorName) {
          qb.orWhere('book.author_description like :authorName', {
            authorName: `%${query.authorName || ''}%`,
          });
        }
      }),
    );

    if (query.categoryId) {
      bookQueryBuilder.andWhere('category.id = :categoryId', {
        categoryId: query.categoryId,
      });
    }

    if (query.releaseStatus) {
      bookQueryBuilder.andWhere('book.release_status = :releaseStatus', {
        releaseStatus: query.releaseStatus,
      });
    }

    if (query.isVip) {
      bookQueryBuilder.andWhere('book.is_vip = :isVip', {
        isVip: query.isVip,
      });
    }

    if (query.sortBy) {
      if (query.sortBy === ESortBy.VIEW) {
        bookQueryBuilder
          .leftJoin('book.histories', 'histories')
          .addSelect('COUNT(histories.id) as countView')
          .groupBy('book.id, bookCategory.category_id')
          .orderBy('countView', query.sortType || 'DESC');
      }

      if (query.sortBy === ESortBy.LIKE) {
        bookQueryBuilder
          .leftJoin('book.likes', 'likes')
          .addSelect('COUNT(likes.id) as countLike')
          .groupBy('book.id, bookCategory.category_id')
          .orderBy('countLike', query.sortType || 'DESC');
      }

      if (query.sortBy === ESortBy.UPDATE_TIME) {
        bookQueryBuilder.orderBy('book.created_at', query.sortType || 'DESC');
      }
    }

    const bookRate = await this.rateRepository
      .createQueryBuilder('rate')
      .select([
        'rate.id',
        'rate.book_id',
        'AVG(rate.rate) as rate',
        'COUNT(rate.id) as count',
      ])
      .groupBy('rate.book_id, rate.id')
      .getRawMany();

    const books = await bookQueryBuilder.getMany();

    return books.map((book) => {
      const data = bookRate.find((el) => el.rate_book_id === book.id);
      return {
        ...book,
        rate: {
          value: data?.rate ? Math.round(data?.rate * 10) / 10 : null,
          count: data?.count ? Number(data?.count) : 0,
        },
      };
    });
  }

  async getOne({ userId, bookId, page = 1, perPage = 20 }) {
    const book = await this.bookRepository
      .createQueryBuilder('book')
      .leftJoin('book.author', 'author')
      .leftJoin('book.bookCategory', 'bookCategory')
      .leftJoin('bookCategory.category', 'category')
      .leftJoin('book.rates', 'rates')
      .leftJoin('rates.user', 'user')
      .loadRelationCountAndMap('book.isLike', 'book.likes', 'likes', (qb) =>
        qb.where('likes.user_id = :userId', { userId }),
      )
      .loadRelationCountAndMap('book.countChapter', 'book.chapters')
      .loadRelationCountAndMap('book.countView', 'book.histories')
      .loadRelationCountAndMap('book.countLike', 'book.likes')
      .loadRelationCountAndMap('book.countDownload', 'book.downloads')
      .select([
        'book.id',
        'book.name',
        'book.image',
        'book.description',
        'book.author_description',
        'book.is_vip',
        'book.release_status',
        'author.id',
        'author.full_name',
        'bookCategory.category_id',
        'category.id',
        'category.name',
        'rates.id',
        'rates.rate',
        'rates.content',
        'rates.updated_at',
        'user.id',
        'user.full_name',
      ])
      .where('book.id = :bookId', { bookId })
      .andWhere('book.is_visible = :is_visible', { is_visible: true })
      .getOne();

    const chapters = await this.chapterRepository
      .createQueryBuilder('chapter')
      .select(['chapter.id', 'chapter.name', 'chapter.description'])
      .where('chapter.book_id = :bookId', { bookId })
      .limit(perPage)
      .offset(page * perPage - perPage)
      .getMany();

    const bookRate = await this.rateRepository
      .createQueryBuilder('rate')
      .select([
        'rate.id',
        'rate.book_id',
        'AVG(rate.rate) as rate',
        'COUNT(rate.id) as count',
      ])
      .where('rate.book_id = :bookId', { bookId })
      .groupBy('rate.book_id, rate.id')
      .getRawOne();

    if (!book) {
      throw new HttpException(
        {
          context: '',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      ...book,
      chapters,
      rate: {
        value: bookRate?.rate ? Math.round(bookRate?.rate * 10) / 10 : null,
        count: bookRate?.count ? Number(bookRate?.count) : 0,
      },
    };
  }

  async downloadFile({ userId, bookId }) {
    try {
      const book = await this.bookRepository
        .createQueryBuilder('book')
        .leftJoin('book.chapters', 'chapters')
        .select([
          'book.id',
          'book.name',
          'chapters.id',
          'chapters.name',
          'chapters.description',
          'chapters.content',
        ])
        .where('book.id = :bookId', { bookId })
        .getOne();

      const pdfBuffer: string = await new Promise((resolve) => {
        const doc = new jsPDF();

        book.chapters.forEach((chapter, index) => {
          doc.text(`hello`, 10, index * 10);
          // doc.text(chapter.content, 10, 10);
        });

        resolve(doc.output());
        // const doc = new PDFDocument({
        //   size: 'LETTER',
        //   bufferPages: true,
        //   font: 'Times-Roman',
        // });

        // book.chapters.forEach((chapter, index) => {
        //   doc.text(`Chương ${index + 1}: ${chapter.name}`, {
        //     width: 450,
        //     align: 'center',
        //   });
        //   doc.moveDown();
        //   doc.text(chapter.content, { width: 450 });
        //   doc.moveDown();
        // });

        // doc.end();

        // const buffer = [];
        // doc.on('data', buffer.push.bind(buffer));
        // doc.on('end', () => {
        //   const data = Buffer.concat(buffer);
        //   resolve(data);
        // });
      });

      return { buffer: pdfBuffer, book: book.name };
    } catch (e) {
      console.log(e);
      return { buffer: '', book: '' };
    }
  }

  async create({
    name,
    description,
    authorDescription,
    image,
    releaseStatus,
    isVisible,
    isVip,
    authorId,
    categoryIds,
    chapters,
  }) {
    const book = await this.bookRepository.findOne({
      name,
      is_visible: true,
    });
    let newBook: Partial<UserEntity>;

    if (!book) {
      newBook = await this.bookRepository.save({
        name,
        description,
        authorDescription,
        image,
        release_status: releaseStatus,
        is_vip: isVip,
        is_visible: isVisible,
        author_id: authorId,
      });
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

    await this.bookCategoryRepository.save(
      categoryIds.map((categoryId: number) => ({
        category_id: categoryId,
        book_id: newBook.id || book.id,
      })),
    );

    await this.chapterService.create({
      bookId: newBook.id || book.id,
      chapters,
    });
  }

  async update({
    bookId,
    name,
    description,
    authorDescription,
    releaseStatus,
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
        ...removeNullProperty({
          name,
          description,
          authorDescription,
          is_visible: isVisible,
          release_status: releaseStatus,
        }),
      },
    );
  }

  async crawl({ userId }) {
    try {
      const url = 'https://www.sachhayonline.com';
      const data = [];

      const getChapterDetail = async ({ href }) => {
        const response = await axios(`${url}/tua-sach/${href}`);
        const $ = cheerio.load(response.data);
        $.html();

        const content = $('.reading-white p');
        let chapterContent = '';

        Object.keys(content).forEach((key) => {
          try {
            chapterContent += content[key].children[0].data += '\n';
          } catch (error) {
            // chapterContent += el.children[0].data += '\n';
          }
        });

        return chapterContent;
      };

      const getBookDetail = async (response) => {
        const $ = cheerio.load(response.data);
        $.html();

        const category = $('.nav a')[1].children[0].data;
        const book = $('.inner > a > h3')[0].children[0].data;
        const description = $('.inner > p')[0]?.children[0]?.data;
        const image = $('.image > a > img')[0].attribs.src;
        const chapters = [];
        const content = $('.default > li');

        for (let i = 0; i < Object.keys(content).length; i++) {
          try {
            const chapterContent = await getChapterDetail({
              href: content[Object.keys(content)[i]].children[0].attribs.href,
            });

            chapters.push({
              name: content[Object.keys(content)[i]].children[0].attribs.title,
              content: chapterContent,
            });
          } catch (error) {}
        }

        data.push({
          category,
          book,
          description,
          image: `${url}/${image.substring(3)}`,
          chapters,
        });
      };

      await axios(url).then(async (response) => {
        const $ = cheerio.load(response.data);
        $.html();

        const books = $('.box > .image > a');

        for (let i = 0; i < Object.keys(books).length; i++) {
          if (i === 0) {
            try {
              await axios(
                `${url}/${books[Object.keys(books)[i]].attribs.href}`,
              ).then(getBookDetail);
            } catch (error) {
              console.log(error);
            }
          }
        }
      });

      for (let i = 0; i < data.length; i++) {
        const { book, category, description, chapters, image } = data[i];

        const findCategory = await this.categoryService.getOne({
          name: category,
        });

        if (!findCategory) {
          const newCategory = await this.categoryService.create({
            name: category,
          });

          await this.create({
            name: book,
            description,
            image,
            authorDescription: '',
            releaseStatus: EReleaseStatus.RELEASED,
            isVisible: true,
            isVip: false,
            authorId: userId,
            categoryIds: [newCategory.id],
            chapters,
          });
        } else {
          await this.create({
            name: book,
            description,
            image,
            authorDescription: '',
            releaseStatus: EReleaseStatus.RELEASED,
            isVisible: true,
            isVip: false,
            authorId: userId,
            categoryIds: [findCategory.id],
            chapters,
          });
        }
      }
    } catch (e) {
      new HttpException(
        {
          context: '',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
