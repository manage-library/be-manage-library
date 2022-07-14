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
exports.UserController = void 0;
const enums_1 = require("../../common/enums");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const role_guard_1 = require("../../guards/role.guard");
const jwt_guard_1 = require("../../guards/jwt.guard");
const user_dto_1 = require("./dtos/user.dto");
const user_service_1 = require("./user.service");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getProfile(req) {
        const userId = req.user.userId;
        return this.userService.getProfile({ userId });
    }
    getUsers(query) {
        return this.userService.getListUser({
            keySearch: query.keySearch,
        });
    }
    getAuthors(query) {
        return this.userService.getListAuthor({
            keySearch: query.keySearch,
        });
    }
    updateProfile(req, body) {
        const userId = req.user.userId;
        return this.userService.updateProfile({ userId, ...body });
    }
    updatePassword(req, body) {
        const userId = req.user.userId;
        return this.userService.updatePassword({ userId, ...body });
    }
    adminUpgradeVip(req, body) {
        const { userId } = req.params;
        const { vipId } = body;
        return this.userService.adminUpgradeVip({ vipId, userId });
    }
    uploadAvatar(file, req) {
        const userId = req.user.userId;
        return this.userService.uploadAvatar({ userId, file });
    }
};
__decorate([
    (0, common_1.Get)('/profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.QueryUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('/authors'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.QueryUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAuthors", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UpdateProfileUser]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Put)('/change-password'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UpdatePasswordUser]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Post)(':userId/upgrade-vip'),
    (0, swagger_1.ApiParam)({
        name: 'userId',
        type: 'number',
    }),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([enums_1.ERole.ADMIN]),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.AdminUpgradeVip]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "adminUpgradeVip", null);
__decorate([
    (0, common_1.Post)('avatar'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "uploadAvatar", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map