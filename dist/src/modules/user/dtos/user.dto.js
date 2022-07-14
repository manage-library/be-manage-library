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
exports.AdminUpgradeVip = exports.UpgradeVip = exports.QueryUserDto = exports.UpdatePasswordUser = exports.UpdateProfileUser = exports.UserRequestDto = exports.UserResponseDto = void 0;
const index_1 = require("./../../../common/enums/index");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let UserResponseDto = class UserResponseDto {
    constructor(data) {
        Object.assign(this, data);
    }
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UserResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], UserResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], UserResponseDto.prototype, "updatedAt", void 0);
UserResponseDto = __decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:paramtypes", [Object])
], UserResponseDto);
exports.UserResponseDto = UserResponseDto;
let UserRequestDto = class UserRequestDto {
    constructor(data) {
        Object.assign(this, data);
    }
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserRequestDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserRequestDto.prototype, "password", void 0);
UserRequestDto = __decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:paramtypes", [Object])
], UserRequestDto);
exports.UserRequestDto = UserRequestDto;
let UpdateProfileUser = class UpdateProfileUser {
};
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UpdateProfileUser.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UpdateProfileUser.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: index_1.EGender,
        default: index_1.EGender.FEMALE,
        examples: index_1.EGender,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UpdateProfileUser.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UpdateProfileUser.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: index_1.EVip,
        default: index_1.EVip.VIP_1,
        examples: index_1.EVip,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UpdateProfileUser.prototype, "vipId", void 0);
UpdateProfileUser = __decorate([
    (0, class_transformer_1.Exclude)()
], UpdateProfileUser);
exports.UpdateProfileUser = UpdateProfileUser;
let UpdatePasswordUser = class UpdatePasswordUser {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UpdatePasswordUser.prototype, "oldPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UpdatePasswordUser.prototype, "password", void 0);
UpdatePasswordUser = __decorate([
    (0, class_transformer_1.Exclude)()
], UpdatePasswordUser);
exports.UpdatePasswordUser = UpdatePasswordUser;
let QueryUserDto = class QueryUserDto {
};
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], QueryUserDto.prototype, "keySearch", void 0);
QueryUserDto = __decorate([
    (0, class_transformer_1.Exclude)()
], QueryUserDto);
exports.QueryUserDto = QueryUserDto;
let UpgradeVip = class UpgradeVip {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: index_1.EVip,
        default: index_1.EVip.VIP_1,
        examples: index_1.EVip,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpgradeVip.prototype, "vipId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpgradeVip.prototype, "status", void 0);
UpgradeVip = __decorate([
    (0, class_transformer_1.Exclude)()
], UpgradeVip);
exports.UpgradeVip = UpgradeVip;
let AdminUpgradeVip = class AdminUpgradeVip {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: index_1.EVip,
        default: index_1.EVip.VIP_1,
        examples: index_1.EVip,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AdminUpgradeVip.prototype, "vipId", void 0);
AdminUpgradeVip = __decorate([
    (0, class_transformer_1.Exclude)()
], AdminUpgradeVip);
exports.AdminUpgradeVip = AdminUpgradeVip;
//# sourceMappingURL=user.dto.js.map