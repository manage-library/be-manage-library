"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const rate_repository_1 = require("./../rate/rate.repository");
const chapter_repository_1 = require("./../chapter/chapter.repository");
const enums_1 = require("../../common/enums");
const category_service_1 = require("./../category/category.service");
const chapter_service_1 = require("./../chapter/chapter.service");
const history_service_1 = require("./../history/history.service");
const category_repository_1 = require("./../category/category.repository");
const common_1 = require("@nestjs/common");
const jspdf_1 = require("jspdf");
const book_repository_1 = require("./repository/book.repository");
const bookCategory_repository_1 = require("./repository/bookCategory.repository");
const typeorm_1 = require("typeorm");
const utils_helper_1 = require("../../common/helpers/utils.helper");
const errorContext_1 = require("../../constants/errorContext");
const cheerio = require('cheerio');
const axios = require('axios');
let BookService = class BookService {
    constructor(categoryRepository, bookRepository, chapterRepository, bookCategoryRepository, historyService, chapterService, categoryService, rateRepository) {
        this.categoryRepository = categoryRepository;
        this.bookRepository = bookRepository;
        this.chapterRepository = chapterRepository;
        this.bookCategoryRepository = bookCategoryRepository;
        this.historyService = historyService;
        this.chapterService = chapterService;
        this.categoryService = categoryService;
        this.rateRepository = rateRepository;
    }
    async getList({ query, userId }) {
        const bookQueryBuilder = this.bookRepository
            .createQueryBuilder('book')
            .leftJoin('book.author', 'author')
            .leftJoin('book.bookCategory', 'bookCategory')
            .leftJoin('bookCategory.category', 'category')
            .loadRelationCountAndMap('book.isLike', 'book.likes', 'likes', (qb) => qb.where('likes.user_id = :userId', { userId }))
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
        bookQueryBuilder.andWhere(new typeorm_1.Brackets((qb) => {
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
        }));
        if (query.categoryId) {
            bookQueryBuilder.andWhere('category.id = :categoryId', {
                categoryId: query.categoryId,
            });
        }
        if (query.categoryName) {
            bookQueryBuilder.andWhere('category.name = :categoryName', {
                categoryName: query.categoryName,
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
            if (query.sortBy === enums_1.ESortBy.VIEW) {
                bookQueryBuilder
                    .leftJoin('book.histories', 'histories')
                    .addSelect('COUNT(histories.id) as countView')
                    .groupBy('book.id, bookCategory.category_id')
                    .orderBy('countView', query.sortType || 'DESC');
            }
            if (query.sortBy === enums_1.ESortBy.LIKE) {
                bookQueryBuilder
                    .leftJoin('book.likes', 'likes')
                    .addSelect('COUNT(likes.id) as countLike')
                    .groupBy('book.id, bookCategory.category_id')
                    .orderBy('countLike', query.sortType || 'DESC');
            }
            if (query.sortBy === enums_1.ESortBy.UPDATE_TIME) {
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
            .loadRelationCountAndMap('book.isLike', 'book.likes', 'likes', (qb) => qb.where('likes.user_id = :userId', { userId }))
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
            'rates.updatedAt',
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
            throw new common_1.HttpException({
                context: '',
            }, common_1.HttpStatus.BAD_REQUEST);
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
            const pdfBuffer = await new Promise((resolve) => {
                const doc = new jspdf_1.jsPDF();
                book.chapters.forEach((chapter, index) => {
                    doc.text(`hello`, 10, index * 10);
                });
                resolve(doc.output());
            });
            return { buffer: pdfBuffer, book: book.name };
        }
        catch (e) {
            console.log(e);
            return { buffer: '', book: '' };
        }
    }
    async create({ name, description, authorDescription, image, releaseStatus, isVisible, isVip, authorId, categoryIds, }) {
        const book = await this.bookRepository.findOne({
            name,
            is_visible: true,
        });
        let newBook;
        if (book) {
            throw new common_1.HttpException({
                context: errorContext_1.BOOK_EXISTED,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (!book) {
            newBook = await this.bookRepository.save({
                name,
                description,
                author_description: authorDescription,
                image,
                release_status: releaseStatus,
                is_vip: isVip,
                is_visible: isVisible,
                author_id: authorId,
            });
        }
        const categories = await this.categoryRepository.findByIds(categoryIds);
        if (categoryIds.length !== categories.length) {
            throw new common_1.HttpException({
                context: '',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        await this.bookCategoryRepository.save(categoryIds.map((categoryId) => ({
            category_id: categoryId,
            book_id: newBook?.id || book.id,
        })));
    }
    async update({ bookId, name, description, authorDescription, releaseStatus, isVisible, categoryIds, }) {
        if (categoryIds) {
            await this.bookCategoryRepository.delete({
                book_id: bookId,
            });
            await this.bookCategoryRepository.save(categoryIds.map((categoryId) => ({
                category_id: categoryId,
                book_id: bookId,
            })));
        }
        await this.bookRepository.update({ id: bookId }, {
            ...(0, utils_helper_1.removeNullProperty)({
                name,
                description,
                author_description: authorDescription,
                is_visible: isVisible,
                release_status: releaseStatus,
            }),
        });
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
                    }
                    catch (error) {
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
                    }
                    catch (error) { }
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
                            await axios(`${url}/${books[Object.keys(books)[i]].attribs.href}`).then(getBookDetail);
                        }
                        catch (error) {
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
                        releaseStatus: enums_1.EReleaseStatus.RELEASED,
                        isVisible: true,
                        isVip: false,
                        authorId: userId,
                        categoryIds: [newCategory.id],
                    });
                }
                else {
                    await this.create({
                        name: book,
                        description,
                        image,
                        authorDescription: '',
                        releaseStatus: enums_1.EReleaseStatus.RELEASED,
                        isVisible: true,
                        isVip: false,
                        authorId: userId,
                        categoryIds: [findCategory.id],
                    });
                }
            }
        }
        catch (e) {
            new common_1.HttpException({
                context: '',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
BookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [category_repository_1.CategoryRepository,
        book_repository_1.BookRepository,
        chapter_repository_1.ChapterRepository,
        bookCategory_repository_1.BookCategoryRepository,
        history_service_1.HistoryService,
        chapter_service_1.ChapterService,
        category_service_1.CategoryService,
        rate_repository_1.RateRepository])
], BookService);
exports.BookService = BookService;
//# sourceMappingURL=book.service.js.map