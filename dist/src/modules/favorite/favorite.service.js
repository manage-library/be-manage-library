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
exports.FavoriteService = void 0;
const favorite_repository_1 = require("./favorite.repository");
const common_1 = require("@nestjs/common");
let FavoriteService = class FavoriteService {
    constructor(favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }
    async favorite({ bookId, userId }) {
        const favorite = await this.favoriteRepository.findOne({
            book_id: bookId,
            user_id: userId,
        });
        if (favorite) {
            throw new common_1.HttpException({
                context: '',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        await this.favoriteRepository.save({
            book_id: bookId,
            user_id: userId,
        });
    }
    async getList({ userId }) {
        const favorite = await this.favoriteRepository
            .createQueryBuilder('favorite')
            .where('favorite.user_id = :userId', { userId })
            .leftJoinAndSelect('favorite.book', 'book')
            .getMany();
        return favorite;
    }
    async unFavorite({ bookId, userId }) {
        const favorite = await this.favoriteRepository.findOne({
            book_id: bookId,
            user_id: userId,
        });
        if (!favorite) {
            throw new common_1.HttpException({
                context: '',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        await this.favoriteRepository.delete({ book_id: bookId, user_id: userId });
    }
};
FavoriteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [favorite_repository_1.FavoriteRepository])
], FavoriteService);
exports.FavoriteService = FavoriteService;
//# sourceMappingURL=favorite.service.js.map