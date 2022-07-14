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
exports.LikeController = void 0;
const jwt_guard_1 = require("./../../guards/jwt.guard");
const like_service_1 = require("./like.service");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let LikeController = class LikeController {
    constructor(likeService) {
        this.likeService = likeService;
    }
    like(req) {
        const userId = req.user.userId;
        const { bookId } = req.params;
        return this.likeService.like({ userId, bookId });
    }
    unlike(req) {
        const userId = req.user.userId;
        const { bookId } = req.params;
        return this.likeService.unLike({ userId, bookId });
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LikeController.prototype, "like", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, swagger_1.ApiParam)({
        name: 'bookId',
        type: 'number',
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LikeController.prototype, "unlike", null);
LikeController = __decorate([
    (0, swagger_1.ApiTags)('Like'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('books/:bookId/like'),
    __metadata("design:paramtypes", [like_service_1.LikeService])
], LikeController);
exports.LikeController = LikeController;
//# sourceMappingURL=like.controller.js.map