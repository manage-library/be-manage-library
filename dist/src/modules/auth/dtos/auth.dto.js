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
exports.registerResponseDto = exports.VerifyForgotPasswordDto = exports.ForgotPasswordDto = exports.RegisterRequestDto = exports.LoginResponseDto = exports.LoginRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let LoginRequestDto = class LoginRequestDto {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'test@gmail.com',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123456',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginRequestDto.prototype, "password", void 0);
LoginRequestDto = __decorate([
    (0, class_transformer_1.Exclude)()
], LoginRequestDto);
exports.LoginRequestDto = LoginRequestDto;
let LoginResponseDto = class LoginResponseDto {
};
LoginResponseDto = __decorate([
    (0, class_transformer_1.Exclude)()
], LoginResponseDto);
exports.LoginResponseDto = LoginResponseDto;
let RegisterRequestDto = class RegisterRequestDto {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.MaxLength)(30),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "fullName", void 0);
RegisterRequestDto = __decorate([
    (0, class_transformer_1.Exclude)()
], RegisterRequestDto);
exports.RegisterRequestDto = RegisterRequestDto;
let ForgotPasswordDto = class ForgotPasswordDto {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ForgotPasswordDto.prototype, "email", void 0);
ForgotPasswordDto = __decorate([
    (0, class_transformer_1.Exclude)()
], ForgotPasswordDto);
exports.ForgotPasswordDto = ForgotPasswordDto;
let VerifyForgotPasswordDto = class VerifyForgotPasswordDto {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], VerifyForgotPasswordDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], VerifyForgotPasswordDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], VerifyForgotPasswordDto.prototype, "password", void 0);
VerifyForgotPasswordDto = __decorate([
    (0, class_transformer_1.Exclude)()
], VerifyForgotPasswordDto);
exports.VerifyForgotPasswordDto = VerifyForgotPasswordDto;
let registerResponseDto = class registerResponseDto {
};
registerResponseDto = __decorate([
    (0, class_transformer_1.Exclude)()
], registerResponseDto);
exports.registerResponseDto = registerResponseDto;
//# sourceMappingURL=auth.dto.js.map