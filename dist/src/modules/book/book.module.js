"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModule = void 0;
const rate_repository_1 = require("./../rate/rate.repository");
const category_module_1 = require("./../category/category.module");
const typeorm_1 = require("@nestjs/typeorm");
const book_service_1 = require("./book.service");
const category_repository_1 = require("./../category/category.repository");
const book_repository_1 = require("./repository/book.repository");
const common_1 = require("@nestjs/common");
const bookCategory_repository_1 = require("./repository/bookCategory.repository");
const book_controller_1 = require("./book.controller");
const history_module_1 = require("../history/history.module");
const chapter_module_1 = require("../chapter/chapter.module");
const chapter_repository_1 = require("../chapter/chapter.repository");
let BookModule = class BookModule {
};
BookModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                book_repository_1.BookRepository,
                bookCategory_repository_1.BookCategoryRepository,
                category_repository_1.CategoryRepository,
                chapter_repository_1.ChapterRepository,
                rate_repository_1.RateRepository
            ]),
            chapter_module_1.ChapterModule,
            history_module_1.HistoryModule,
            category_module_1.CategoryModule,
        ],
        controllers: [book_controller_1.BookController],
        providers: [book_service_1.BookService],
    })
], BookModule);
exports.BookModule = BookModule;
//# sourceMappingURL=book.module.js.map