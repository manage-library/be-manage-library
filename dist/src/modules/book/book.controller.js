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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const paginate_1 = require("./../../dto/paginate");
const book_dto_1 = require("./dto/book.dto");
const jwt_guard_1 = require("./../../guards/jwt.guard");
const book_service_1 = require("./book.service");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const enums_1 = require("../../common/enums");
const role_guard_1 = require("../../guards/role.guard");
let BookController = class BookController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    getList(req, query) {
        const userId = req.user.userId;
        return this.bookService.getList({ query, userId });
    }
    getOne(req, { page, perPage }) {
        const userId = req.user.userId;
        const { bookId } = req.params;
        return this.bookService.getOne({ bookId, userId, page, perPage });
    }
    async downloadFile(req, res) {
        const userId = req.user.userId;
        const { bookId } = req.params;
        const { buffer, book } = await this.bookService.downloadFile({
            userId,
            bookId,
        });
        console.log(buffer);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=test.pdf`,
            'Content-Length': buffer.length,
        });
        res.end(buffer);
    }
    create(req, body) {
        const userId = req.user.userId;
        return this.bookService.create({ ...body, authorId: userId });
    }
    update(req, body) {
        const { bookId } = req.params;
        return this.bookService.update({ ...body, bookId });
    }
    crawl(req) {
        const userId = req.user.userId;
        return this.bookService.crawl({ userId });
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([enums_1.ERole.ADMIN, enums_1.ERole.USER]),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)(new common_1.ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, book_dto_1.QueryBookDto]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "getList", null);
__decorate([
    (0, common_1.Get)(':bookId'),
    (0, roles_decorator_1.Roles)([enums_1.ERole.ADMIN, enums_1.ERole.USER]),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, swagger_1.ApiParam)({
        name: 'bookId',
        type: 'number',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, paginate_1.PaginateDto]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "getOne", null);
__decorate([
    (0, common_1.Get)(':bookId/download'),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([enums_1.ERole.ADMIN, enums_1.ERole.USER]),
    (0, swagger_1.ApiParam)({
        name: 'bookId',
        type: 'number',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "downloadFile", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([enums_1.ERole.ADMIN]),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, book_dto_1.CreateBookRequestDto]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':bookId'),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([enums_1.ERole.ADMIN]),
    (0, swagger_1.ApiParam)({
        name: 'bookId',
        type: 'number',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, book_dto_1.UpdateBookRequestDto]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('/crawl'),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([enums_1.ERole.ADMIN]),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "crawl", null);
BookController = __decorate([
    (0, swagger_1.ApiTags)('Book'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)('books'),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BookController);
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map