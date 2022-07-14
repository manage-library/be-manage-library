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
exports.FileService = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const aws_sdk_1 = require("aws-sdk");
let FileService = class FileService {
    constructor(configService) {
        this.configService = configService;
        this.s3 = new aws_sdk_1.S3({
            accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
        });
    }
    async uploadFile({ dataBuffer, filename, mimetype, }) {
        await this.s3
            .upload({
            Bucket: this.configService.get('AWS_BUCKET_NAME'),
            Body: dataBuffer,
            Key: filename,
            ContentType: mimetype,
        })
            .promise();
    }
    async getPrivateFile(filename) {
        const stream = await this.s3
            .getObject({
            Bucket: this.configService.get('AWS_BUCKET_NAME'),
            Key: filename,
        })
            .createReadStream();
        return {
            stream,
        };
    }
};
FileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map