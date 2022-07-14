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
exports.UserEntity = void 0;
const rate_entity_1 = require("./../rate/rate.entity");
const like_entity_1 = require("./../like/like.entity");
const transaction_entity_1 = require("./../transaction/transaction.entity");
const history_entity_1 = require("./../history/history.entity");
const favorite_entity_1 = require("./../favorite/favorite.entity");
const download_entity_1 = require("./../download/download.entity");
const comment_entity_1 = require("./../comment/comment.entity");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entities/base.entity");
const book_entity_1 = require("./../book/entity/book.entity");
let UserEntity = class UserEntity extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { name: 'id' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'full_name', nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "full_name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'email' }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'password' }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'date_of_birth', nullable: true }),
    __metadata("design:type", Date)
], UserEntity.prototype, "date_of_birth", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'gender', nullable: true }),
    __metadata("design:type", Number)
], UserEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'avatar', nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'code', nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'code_expire_at', nullable: true }),
    __metadata("design:type", Date)
], UserEntity.prototype, "code_expire_at", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'role_id' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "role_id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'vip_id' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "vip_id", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'expired_vip_at', nullable: true }),
    __metadata("design:type", Date)
], UserEntity.prototype, "expired_vip_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => book_entity_1.BookEntity, (book) => book.author),
    __metadata("design:type", Array)
], UserEntity.prototype, "books", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.CommentEntity, (comment) => comment.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => download_entity_1.DownloadEntity, (download) => download.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "downloads", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => favorite_entity_1.FavoriteEntity, (favorite) => favorite.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "favorites", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_entity_1.LikeEntity, (like) => like.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rate_entity_1.RateEntity, (rate) => rate.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "rates", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => history_entity_1.HistoryEntity, (history) => history.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "histories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => transaction_entity_1.TransactionEntity, (transaction) => transaction.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "transactions", void 0);
UserEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map