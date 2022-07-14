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
exports.UpdateBookRequestDto = exports.CreateBookRequestDto = exports.UpdateChapterRequestDto = exports.CreateChapterRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../../common/enums");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let CreateChapterRequestDto = class CreateChapterRequestDto {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateChapterRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateChapterRequestDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateChapterRequestDto.prototype, "content", void 0);
CreateChapterRequestDto = __decorate([
    (0, class_transformer_1.Exclude)()
], CreateChapterRequestDto);
exports.CreateChapterRequestDto = CreateChapterRequestDto;
let UpdateChapterRequestDto = class UpdateChapterRequestDto {
};
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UpdateChapterRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UpdateChapterRequestDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UpdateChapterRequestDto.prototype, "content", void 0);
UpdateChapterRequestDto = __decorate([
    (0, class_transformer_1.Exclude)()
], UpdateChapterRequestDto);
exports.UpdateChapterRequestDto = UpdateChapterRequestDto;
let CreateBookRequestDto = class CreateBookRequestDto {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateBookRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateBookRequestDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: enums_1.EReleaseStatus,
        default: enums_1.EReleaseStatus.RELEASING,
        examples: enums_1.EReleaseStatus,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], CreateBookRequestDto.prototype, "releaseStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], CreateBookRequestDto.prototype, "isVisible", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], CreateBookRequestDto.prototype, "isVip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], CreateBookRequestDto.prototype, "categoryIds", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({ type: () => [CreateChapterRequestDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], CreateBookRequestDto.prototype, "chapters", void 0);
CreateBookRequestDto = __decorate([
    (0, class_transformer_1.Exclude)()
], CreateBookRequestDto);
exports.CreateBookRequestDto = CreateBookRequestDto;
let UpdateBookRequestDto = class UpdateBookRequestDto {
};
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UpdateBookRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UpdateBookRequestDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: enums_1.EReleaseStatus,
        default: enums_1.EReleaseStatus.RELEASING,
        examples: enums_1.EReleaseStatus,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UpdateBookRequestDto.prototype, "releaseStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], UpdateBookRequestDto.prototype, "isVisible", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], UpdateBookRequestDto.prototype, "categoryIds", void 0);
UpdateBookRequestDto = __decorate([
    (0, class_transformer_1.Exclude)()
], UpdateBookRequestDto);
exports.UpdateBookRequestDto = UpdateBookRequestDto;
//# sourceMappingURL=book.dto.js.map