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
exports.ChapterEntity = void 0;
const book_entity_1 = require("./../book/entity/book.entity");
const history_entity_1 = require("../history/history.entity");
const base_entity_1 = require("../../common/entities/base.entity");
const typeorm_1 = require("typeorm");
let ChapterEntity = class ChapterEntity extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { name: 'id' }),
    __metadata("design:type", Number)
], ChapterEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'name' }),
    __metadata("design:type", String)
], ChapterEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'description', nullable: true }),
    __metadata("design:type", String)
], ChapterEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('longtext', { name: 'content' }),
    __metadata("design:type", String)
], ChapterEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'book_id' }),
    __metadata("design:type", Number)
], ChapterEntity.prototype, "book_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => book_entity_1.BookEntity, (book) => book.chapters),
    (0, typeorm_1.JoinColumn)({ name: 'book_id', referencedColumnName: 'id' }),
    __metadata("design:type", book_entity_1.BookEntity)
], ChapterEntity.prototype, "book", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => history_entity_1.HistoryEntity, (history) => history.chapter),
    __metadata("design:type", Array)
], ChapterEntity.prototype, "histories", void 0);
ChapterEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'chapter' })
], ChapterEntity);
exports.ChapterEntity = ChapterEntity;
//# sourceMappingURL=chapter.entity.js.map