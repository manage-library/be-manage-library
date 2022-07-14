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
exports.ChapterController = void 0;
const index_1 = require("./../../common/enums/index");
const book_dto_1 = require("./dto/book.dto");
const jwt_guard_1 = require("../../guards/jwt.guard");
const chapter_service_1 = require("./chapter.service");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_guard_1 = require("../../guards/role.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const vip_guard_1 = require("../../guards/vip.guard");
let ChapterController = class ChapterController {
    constructor(chapterService) {
        this.chapterService = chapterService;
    }
    create(req, body) {
        const { bookId } = req.params;
        return this.chapterService.create({ chapters: body, bookId });
    }
    getOne(req) {
        const userId = req.user.userId;
        const { bookId, chapterId } = req.params;
        return this.chapterService.getOne({ userId, bookId, chapterId });
    }
    update(req, body) {
        const { bookId, chapterId } = req.params;
        return this.chapterService.update({ ...body, bookId, chapterId });
    }
    remove(req) {
        const { bookId, chapterId } = req.params;
        return this.chapterService.remove({ bookId, chapterId });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([index_1.ERole.ADMIN]),
    (0, swagger_1.ApiParam)({
        name: 'bookId',
        type: 'number',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", void 0)
], ChapterController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':chapterId'),
    (0, roles_decorator_1.Roles)([index_1.ERole.ADMIN, index_1.ERole.USER]),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, common_1.UseGuards)(vip_guard_1.VipGuard),
    (0, swagger_1.ApiParam)({
        name: 'bookId',
        type: 'number',
    }),
    (0, swagger_1.ApiParam)({
        name: 'chapterId',
        type: 'number',
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChapterController.prototype, "getOne", null);
__decorate([
    (0, common_1.Put)(':chapterId'),
    (0, roles_decorator_1.Roles)([index_1.ERole.ADMIN]),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, swagger_1.ApiParam)({
        name: 'bookId',
        type: 'number',
    }),
    (0, swagger_1.ApiParam)({
        name: 'chapterId',
        type: 'number',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, book_dto_1.UpdateChapterRequestDto]),
    __metadata("design:returntype", void 0)
], ChapterController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':chapterId'),
    (0, roles_decorator_1.Roles)([index_1.ERole.ADMIN]),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, swagger_1.ApiParam)({
        name: 'bookId',
        type: 'number',
    }),
    (0, swagger_1.ApiParam)({
        name: 'chapterId',
        type: 'number',
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChapterController.prototype, "remove", null);
ChapterController = __decorate([
    (0, swagger_1.ApiTags)('Chapter'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)('books/:bookId/chapters'),
    __metadata("design:paramtypes", [chapter_service_1.ChapterService])
], ChapterController);
exports.ChapterController = ChapterController;
//# sourceMappingURL=chapter.controller.js.map