"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRepository = void 0;
const book_entity_1 = require("./../entity/book.entity");
const typeorm_1 = require("typeorm");
let BookRepository = class BookRepository extends typeorm_1.Repository {
};
BookRepository = __decorate([
    (0, typeorm_1.EntityRepository)(book_entity_1.BookEntity)
], BookRepository);
exports.BookRepository = BookRepository;
//# sourceMappingURL=book.repository.js.map