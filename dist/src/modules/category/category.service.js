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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const category_repository_1 = require("./category.repository");
const bookCategory_repository_1 = require("../book/repository/bookCategory.repository");
let CategoryService = class CategoryService {
    constructor(categoryRepository, bookCategoryRepository) {
        this.categoryRepository = categoryRepository;
        this.bookCategoryRepository = bookCategoryRepository;
    }
    async create({ name }) {
        const category = await this.categoryRepository.findOne({
            name,
        });
        if (category) {
            throw new common_1.HttpException({
                content: '',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const newCategory = await this.categoryRepository.save({
            name,
        });
        return newCategory;
    }
    getList() {
        return this.categoryRepository.find();
    }
    getOne({ name }) {
        return this.categoryRepository.findOne({
            name,
        });
    }
    async update({ categoryId, name }) {
        const category = await this.categoryRepository.findOne({
            name,
        });
        if (category && category.id !== categoryId) {
            throw new common_1.HttpException({
                content: '',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        await this.categoryRepository.update({
            id: categoryId,
        }, { name });
    }
    async remove({ categoryId }) {
        const bookCategory = await this.bookCategoryRepository.findOne({
            category_id: categoryId,
        });
        if (bookCategory) {
            throw new common_1.HttpException({
                content: '',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        await this.categoryRepository.delete({ id: categoryId });
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [category_repository_1.CategoryRepository,
        bookCategory_repository_1.BookCategoryRepository])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map