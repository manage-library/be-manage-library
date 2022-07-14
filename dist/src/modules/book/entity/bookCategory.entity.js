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
exports.BookCategoryEntity = void 0;
const category_entity_1 = require("../../category/category.entity");
const base_entity_1 = require("../../../common/entities/base.entity");
const typeorm_1 = require("typeorm");
const book_entity_1 = require("./book.entity");
let BookCategoryEntity = class BookCategoryEntity extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { name: 'id' }),
    __metadata("design:type", Number)
], BookCategoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'book_id' }),
    __metadata("design:type", Number)
], BookCategoryEntity.prototype, "book_id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'category_id' }),
    __metadata("design:type", Number)
], BookCategoryEntity.prototype, "category_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => book_entity_1.BookEntity, (book) => book.bookCategory),
    (0, typeorm_1.JoinColumn)({ name: 'book_id', referencedColumnName: 'id' }),
    __metadata("design:type", book_entity_1.BookEntity)
], BookCategoryEntity.prototype, "book", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.CategoryEntity, (category) => category.bookCategory),
    (0, typeorm_1.JoinColumn)({ name: 'category_id', referencedColumnName: 'id' }),
    __metadata("design:type", category_entity_1.CategoryEntity)
], BookCategoryEntity.prototype, "category", void 0);
BookCategoryEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'book_category' })
], BookCategoryEntity);
exports.BookCategoryEntity = BookCategoryEntity;
//# sourceMappingURL=bookCategory.entity.js.map