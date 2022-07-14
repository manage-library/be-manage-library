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
exports.AuthService = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../user/user.repository");
const jwt_helper_1 = require("../../common/helpers/jwt.helper");
const errorContext_1 = require("../../constants/errorContext");
const bcrypt_helper_1 = require("./../../common/helpers/bcrypt.helper");
const enums_1 = require("../../common/enums");
const utils_helper_1 = require("../../common/helpers/utils.helper");
const dayjs = require("dayjs");
const nodemailer_service_1 = require("../nodemailer/nodemailer.service");
let AuthService = class AuthService {
    constructor(userRepository, configService, nodemailerService) {
        this.userRepository = userRepository;
        this.configService = configService;
        this.nodemailerService = nodemailerService;
    }
    async login({ email, password }) {
        const user = await this.userRepository.findOne({ email });
        if (user && (await (0, bcrypt_helper_1.isMatchPassword)({ password, hash: user.password }))) {
            const { accessToken } = (0, jwt_helper_1.generateToken)({
                userId: user.id,
            }, this.configService);
            return { accessToken };
        }
        throw new common_1.HttpException({
            context: errorContext_1.AUTH_FAILED,
        }, common_1.HttpStatus.BAD_REQUEST);
    }
    async register({ email, password, fullName }) {
        const user = await this.userRepository.findOne({
            email,
        });
        if (user) {
            throw new common_1.HttpException({
                context: 'USER_NOT_EXIST',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const hash = await (0, bcrypt_helper_1.hashPassword)(password);
        await this.userRepository.save({
            email,
            password: hash,
            full_name: fullName,
            role_id: enums_1.ERole.USER,
            vip_id: enums_1.EVip.VIP_0,
        });
    }
    async forgotPassword({ email }) {
        const user = await this.userRepository.findOne({
            email,
        });
        if (!user) {
            throw new common_1.HttpException({
                context: 'USER_NOT_EXIST',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const code = (0, utils_helper_1.randomString)(6);
        await this.userRepository.save({
            ...user,
            code,
            code_expire_at: dayjs().add(5, 'minute').format(),
        });
        await this.nodemailerService.sendMail({ email, code });
    }
    async veriForgotPassword({ email, code, password }) {
        const user = await this.userRepository.findOne({
            email,
        });
        if (!user) {
            throw new common_1.HttpException({
                context: 'USER_NOT_EXIST',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (user.code !== code) {
            throw new common_1.HttpException({
                context: 'CODE_NOT_VALID',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (dayjs().isAfter(dayjs(user.code_expire_at))) {
            throw new common_1.HttpException({
                context: 'CODE_EXPIRED',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const hash = await (0, bcrypt_helper_1.hashPassword)(password);
        await this.userRepository.save({
            ...user,
            password: hash,
            code: null,
            code_expire_at: null,
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        config_1.ConfigService,
        nodemailer_service_1.NodeMailerService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map