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
exports.CategoryController = void 0;
const roles_decorator_1 = require("./../../common/decorators/roles.decorator");
const category_dto_1 = require("./dto/category.dto");
const jwt_guard_1 = require("./../../guards/jwt.guard");
const category_service_1 = require("./category.service");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_guard_1 = require("../../guards/role.guard");
const enums_1 = require("../../common/enums");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    getList() {
        const categories = this.categoryService.getList();
        return categories;
    }
    create(req, body) {
        return this.categoryService.create(body);
    }
    update(req, body) {
        const { categoryId } = req.params;
        return this.categoryService.update({ categoryId, ...body });
    }
    remove(req) {
        const { categoryId } = req.params;
        return this.categoryService.remove({ categoryId });
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([enums_1.ERole.ADMIN, enums_1.ERole.USER]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "getList", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([enums_1.ERole.ADMIN]),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, category_dto_1.CreateCategoryRequestDto]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':categoryId'),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([enums_1.ERole.ADMIN]),
    (0, swagger_1.ApiParam)({
        name: 'categoryId',
        type: 'number',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, category_dto_1.UpdateCategoryRequestDto]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':categoryId'),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([enums_1.ERole.ADMIN]),
    (0, swagger_1.ApiParam)({
        name: 'categoryId',
        type: 'number',
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "remove", null);
CategoryController = __decorate([
    (0, swagger_1.ApiTags)('Category'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map