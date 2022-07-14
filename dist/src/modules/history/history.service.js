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
exports.HistoryService = void 0;
const history_repository_1 = require("./history.repository");
const common_1 = require("@nestjs/common");
let HistoryService = class HistoryService {
    constructor(historyRepository) {
        this.historyRepository = historyRepository;
    }
    getList({ userId }) {
        return this.historyRepository
            .createQueryBuilder('history')
            .leftJoinAndSelect('history.book', 'book', 'book.is_visible = :isVisible', { isVisible: true })
            .leftJoinAndSelect('history.chapter', 'chapter')
            .where('user_id = :userId', { userId })
            .getMany();
    }
    async update({ userId, bookId, chapterId }) {
        const history = await this.historyRepository.findOne({
            user_id: userId,
            book_id: bookId,
        });
        if (!history) {
            return await this.historyRepository.save({
                user_id: userId,
                book_id: bookId,
                chapter_id: chapterId,
            });
        }
        if (history && chapterId) {
            return await this.historyRepository.save({
                ...history,
                chapter_id: chapterId,
            });
        }
    }
};
HistoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [history_repository_1.HistoryRepository])
], HistoryService);
exports.HistoryService = HistoryService;
//# sourceMappingURL=history.service.js.map