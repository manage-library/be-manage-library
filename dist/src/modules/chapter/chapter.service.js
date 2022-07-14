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
exports.ChapterService = void 0;
const history_service_1 = require("../history/history.service");
const chapter_repository_1 = require("./chapter.repository");
const common_1 = require("@nestjs/common");
let ChapterService = class ChapterService {
    constructor(chapterRepository, historyService) {
        this.chapterRepository = chapterRepository;
        this.historyService = historyService;
    }
    async getOne({ userId, bookId, chapterId }) {
        const chapter = await this.chapterRepository.findOne({
            id: chapterId,
            book_id: bookId,
        });
        if (!chapter) {
            throw new common_1.HttpException({
                context: '',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        const nextChap = await this.chapterRepository
            .createQueryBuilder('chapter')
            .select('chapter.id')
            .where(`chapter.id > :id`, { id: chapter.id })
            .andWhere('chapter.book_id = :bookId', { bookId })
            .getOne();
        const preChap = await this.chapterRepository
            .createQueryBuilder('chapter')
            .select('chapter.id')
            .where(`chapter.id < :id`, { id: chapter.id })
            .andWhere('chapter.book_id = :bookId', { bookId })
            .orderBy('id', 'DESC')
            .getOne();
        await this.historyService.update({
            userId,
            bookId,
            chapterId,
        });
        return {
            ...chapter,
            preChap: preChap?.id || null,
            nextChap: nextChap?.id || null,
        };
    }
    async create({ bookId, chapters }) {
        await this.chapterRepository.save(chapters.map((chapter) => ({ ...chapter, book_id: bookId })));
    }
    async update({ bookId, chapterId, name, description, content }) {
        const chapter = await this.chapterRepository.findOne({
            book_id: bookId,
            id: chapterId,
        });
        if (!chapter) {
            throw new common_1.HttpException({
                context: '',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        await this.chapterRepository.update({ id: chapterId, book_id: bookId }, {
            name,
            description,
            content,
        });
    }
    async remove({ bookId, chapterId }) {
        const chapter = await this.chapterRepository.findOne({
            id: chapterId,
            book_id: bookId,
        });
        if (!chapter) {
            throw new common_1.HttpException({
                context: '',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        await this.chapterRepository.delete(chapter);
    }
};
ChapterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [chapter_repository_1.ChapterRepository,
        history_service_1.HistoryService])
], ChapterService);
exports.ChapterService = ChapterService;
//# sourceMappingURL=chapter.service.js.map