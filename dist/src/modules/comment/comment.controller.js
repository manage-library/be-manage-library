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
exports.CommentController = void 0;
const jwt_guard_1 = require("../../guards/jwt.guard");
const comment_service_1 = require("./comment.service");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const comment_dto_1 = require("./dto/comment.dto");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    create(req, body) {
        const userId = req.user.userId;
        const { bookId } = req.params;
        return this.commentService.create({ ...body, bookId, userId });
    }
    getList(req) {
        const { bookId } = req.params;
        return this.commentService.getList({ bookId });
    }
    update(req, body) {
        const userId = req.user.userId;
        const { bookId, commentId } = req.params;
        return this.commentService.update({ ...body, bookId, userId, commentId });
    }
    remove(req) {
        const userId = req.user.userId;
        const { bookId, commentId } = req.params;
        return this.commentService.remove({ bookId, userId, commentId });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiParam)({
        name: 'bookId',
        type: 'number',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, comment_dto_1.CommentDto]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiParam)({
        name: 'bookId',
        type: 'number',
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "getList", null);
__decorate([
    (0, common_1.Put)(':commentId'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiParam)({
        name: 'bookId',
        type: 'number',
    }),
    (0, swagger_1.ApiParam)({
        name: 'commentId',
        type: 'number',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, comment_dto_1.CommentDto]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':commentId'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiParam)({
        name: 'bookId',
        type: 'number',
    }),
    (0, swagger_1.ApiParam)({
        name: 'commentId',
        type: 'number',
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "remove", null);
CommentController = __decorate([
    (0, swagger_1.ApiTags)('Comments'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('books/:bookId/comments'),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map