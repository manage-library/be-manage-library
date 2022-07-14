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
exports.FavoriteEntity = void 0;
const user_entity_1 = require("../user/user.entity");
const book_entity_1 = require("./../book/entity/book.entity");
const base_entity_1 = require("../../common/entities/base.entity");
const typeorm_1 = require("typeorm");
let FavoriteEntity = class FavoriteEntity extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { name: 'id' }),
    __metadata("design:type", Number)
], FavoriteEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'user_id' }),
    __metadata("design:type", Number)
], FavoriteEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'book_id' }),
    __metadata("design:type", Number)
], FavoriteEntity.prototype, "book_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => book_entity_1.BookEntity, (book) => book.favorites),
    (0, typeorm_1.JoinColumn)({ name: 'book_id', referencedColumnName: 'id' }),
    __metadata("design:type", book_entity_1.BookEntity)
], FavoriteEntity.prototype, "book", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.favorites),
    (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], FavoriteEntity.prototype, "user", void 0);
FavoriteEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'favorites' })
], FavoriteEntity);
exports.FavoriteEntity = FavoriteEntity;
//# sourceMappingURL=favorite.entity.js.map