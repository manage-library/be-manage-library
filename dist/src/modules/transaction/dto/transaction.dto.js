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
exports.CreateTransactionDto = exports.RechargeDto = exports.GetTransactionDto = void 0;
const index_1 = require("./../../../common/enums/index");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const decorators_1 = require("../../../common/decorators");
let GetTransactionDto = class GetTransactionDto {
};
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], GetTransactionDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: index_1.EVip,
        enum: Object.values(index_1.EVip),
    }),
    (0, class_validator_1.IsEnum)(index_1.EVip),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], GetTransactionDto.prototype, "vipId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, decorators_1.ToBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], GetTransactionDto.prototype, "status", void 0);
GetTransactionDto = __decorate([
    (0, class_transformer_1.Exclude)()
], GetTransactionDto);
exports.GetTransactionDto = GetTransactionDto;
let RechargeDto = class RechargeDto {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RechargeDto.prototype, "signature", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RechargeDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], RechargeDto.prototype, "tranId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RechargeDto.prototype, "ackTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RechargeDto.prototype, "partnerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RechargeDto.prototype, "partnerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], RechargeDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RechargeDto.prototype, "comment", void 0);
RechargeDto = __decorate([
    (0, class_transformer_1.Exclude)()
], RechargeDto);
exports.RechargeDto = RechargeDto;
let CreateTransactionDto = class CreateTransactionDto {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateTransactionDto.prototype, "vipId", void 0);
CreateTransactionDto = __decorate([
    (0, class_transformer_1.Exclude)()
], CreateTransactionDto);
exports.CreateTransactionDto = CreateTransactionDto;
//# sourceMappingURL=transaction.dto.js.map