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
exports.LikeService = void 0;
const like_repository_1 = require("./like.repository");
const common_1 = require("@nestjs/common");
let LikeService = class LikeService {
    constructor(likeRepository) {
        this.likeRepository = likeRepository;
    }
    async like({ bookId, userId }) {
        const like = await this.likeRepository.findOne({
            book_id: bookId,
            user_id: userId,
        });
        if (like) {
            throw new common_1.HttpException({
                context: '',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        await this.likeRepository.save({
            book_id: bookId,
            user_id: userId,
        });
    }
    async unLike({ bookId, userId }) {
        const like = await this.likeRepository.findOne({
            book_id: bookId,
            user_id: userId,
        });
        if (!like) {
            throw new common_1.HttpException({
                context: '',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        await this.likeRepository.delete(like);
    }
};
LikeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [like_repository_1.LikeRepository])
], LikeService);
exports.LikeService = LikeService;
//# sourceMappingURL=like.service.js.map