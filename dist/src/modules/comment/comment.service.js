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
exports.CommentService = void 0;
const comment_repository_1 = require("./comment.repository");
const common_1 = require("@nestjs/common");
let CommentService = class CommentService {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }
    getList({ bookId }) {
        return this.commentRepository
            .createQueryBuilder('comment')
            .leftJoin('comment.user', 'user')
            .select([
            'comment.id',
            'comment.content',
            'user.id',
            'user.full_name',
            'comment.updatedAt',
        ])
            .where('comment.book_id = :bookId', { bookId })
            .getMany();
    }
    create({ bookId, userId, content }) {
        try {
            return this.commentRepository.save({
                book_id: bookId,
                user_id: userId,
                content,
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    async update({ bookId, userId, commentId, content }) {
        const comment = await this.commentRepository.findOne({
            id: commentId,
            book_id: bookId,
            user_id: userId,
        });
        if (!comment) {
            throw new common_1.HttpException({
                context: '',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return this.commentRepository.update({ id: commentId, user_id: userId, book_id: bookId }, {
            content,
        });
    }
    async remove({ bookId, userId, commentId }) {
        const comment = await this.commentRepository.findOne({
            id: commentId,
            book_id: bookId,
            user_id: userId,
        });
        if (!comment) {
            throw new common_1.HttpException({
                context: '',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return this.commentRepository.delete({
            id: commentId,
        });
    }
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [comment_repository_1.CommentRepository])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map