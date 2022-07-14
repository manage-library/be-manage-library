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
exports.VipGuard = void 0;
const book_entity_1 = require("./../modules/book/entity/book.entity");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./../modules/user/user.entity");
const dayjs = require("dayjs");
let VipGuard = class VipGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const { bookId } = req.params;
        const userId = req?.user?.userId;
        const book = await this.getBook(bookId);
        console.log(book);
        if (book && !book.is_vip) {
            return true;
        }
        if (book && book.is_vip) {
            const user = await this.getUser(userId);
            if (user &&
                user.vip_id &&
                user.expired_vip_at &&
                dayjs().isBefore(dayjs(user.expired_vip_at))) {
                return true;
            }
        }
        return false;
    }
    getUser(userId) {
        return (0, typeorm_1.getRepository)(user_entity_1.UserEntity)
            .createQueryBuilder('users')
            .where('users.id = :userId', { userId })
            .getOne();
    }
    getBook(bookId) {
        return (0, typeorm_1.getRepository)(book_entity_1.BookEntity)
            .createQueryBuilder('books')
            .where('books.id = :bookId', { bookId })
            .andWhere('books.is_visible = :isVisible', { isVisible: true })
            .getOne();
    }
};
VipGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], VipGuard);
exports.VipGuard = VipGuard;
//# sourceMappingURL=vip.guard.js.map