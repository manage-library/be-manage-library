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
exports.RateController = void 0;
const jwt_guard_1 = require("../../guards/jwt.guard");
const rate_service_1 = require("./rate.service");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RateDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RateDto.prototype, "rate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RateDto.prototype, "content", void 0);
let RateController = class RateController {
    constructor(rateService) {
        this.rateService = rateService;
    }
    create(req, body) {
        const userId = req.user.userId;
        const { bookId } = req.params;
        const { rate, content } = body;
        return this.rateService.create({ userId, bookId, rate, content });
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
    __metadata("design:paramtypes", [Object, RateDto]),
    __metadata("design:returntype", void 0)
], RateController.prototype, "create", null);
RateController = __decorate([
    (0, swagger_1.ApiTags)('Rate'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('books/:bookId/rate'),
    __metadata("design:paramtypes", [rate_service_1.RateService])
], RateController);
exports.RateController = RateController;
//# sourceMappingURL=rate.controller.js.map