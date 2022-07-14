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
exports.BookEntity = void 0;
const rate_entity_1 = require("./../../rate/rate.entity");
const like_entity_1 = require("./../../like/like.entity");
const history_entity_1 = require("./../../history/history.entity");
const download_entity_1 = require("./../../download/download.entity");
const comment_entity_1 = require("./../../comment/comment.entity");
const user_entity_1 = require("../../user/user.entity");
const base_entity_1 = require("../../../common/entities/base.entity");
const typeorm_1 = require("typeorm");
const bookCategory_entity_1 = require("./bookCategory.entity");
const chapter_entity_1 = require("../../chapter/chapter.entity");
const favorite_entity_1 = require("../../favorite/favorite.entity");
let BookEntity = class BookEntity extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { name: 'id' }),
    __metadata("design:type", Number)
], BookEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'name' }),
    __metadata("design:type", String)
], BookEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'description' }),
    __metadata("design:type", String)
], BookEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'image' }),
    __metadata("design:type", String)
], BookEntity.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { name: 'is_vip' }),
    __metadata("design:type", Boolean)
], BookEntity.prototype, "is_vip", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { name: 'is_visible' }),
    __metadata("design:type", Boolean)
], BookEntity.prototype, "is_visible", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'release_status' }),
    __metadata("design:type", Number)
], BookEntity.prototype, "release_status", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'author_id' }),
    __metadata("design:type", Number)
], BookEntity.prototype, "author_id", void 0);
__decorate([
    (0, typeorm_1.Column)('longtext', { name: 'author_description' }),
    __metadata("design:type", Number)
], BookEntity.prototype, "author_description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.books),
    (0, typeorm_1.JoinColumn)({ name: 'author_id', referencedColumnName: 'id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], BookEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bookCategory_entity_1.BookCategoryEntity, (bookCategory) => bookCategory.book),
    __metadata("design:type", Array)
], BookEntity.prototype, "bookCategory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => chapter_entity_1.ChapterEntity, (chapter) => chapter.book),
    __metadata("design:type", Array)
], BookEntity.prototype, "chapters", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.CommentEntity, (comment) => comment.book),
    __metadata("design:type", Array)
], BookEntity.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => download_entity_1.DownloadEntity, (download) => download.book),
    __metadata("design:type", Array)
], BookEntity.prototype, "downloads", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => favorite_entity_1.FavoriteEntity, (favorite) => favorite.book),
    __metadata("design:type", Array)
], BookEntity.prototype, "favorites", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_entity_1.LikeEntity, (favorite) => favorite.book),
    __metadata("design:type", Array)
], BookEntity.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rate_entity_1.RateEntity, (rate) => rate.book),
    __metadata("design:type", Array)
], BookEntity.prototype, "rates", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => history_entity_1.HistoryEntity, (history) => history.book),
    __metadata("design:type", Array)
], BookEntity.prototype, "histories", void 0);
BookEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'books' })
], BookEntity);
exports.BookEntity = BookEntity;
//# sourceMappingURL=book.entity.js.map