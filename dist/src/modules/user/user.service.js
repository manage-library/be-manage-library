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
exports.UserService = void 0;
const book_repository_1 = require("./../book/repository/book.repository");
const errorContext_1 = require("./../../constants/errorContext");
const transaction_service_1 = require("./../transaction/transaction.service");
const bcrypt_helper_1 = require("./../../common/helpers/bcrypt.helper");
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./user.repository");
const dayjs = require("dayjs");
const utils_helper_1 = require("../../common/helpers/utils.helper");
const file_service_1 = require("../file/file.service");
const uuid_1 = require("uuid");
let UserService = class UserService {
    constructor(userRepository, bookRepository, transactionService, fileService) {
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
        this.transactionService = transactionService;
        this.fileService = fileService;
    }
    getProfile({ userId }) {
        return this.userRepository.findOne({
            where: {
                id: userId,
            },
            select: [
                'email',
                'full_name',
                'vip_id',
                'gender',
                'avatar',
                'date_of_birth',
                'expired_vip_at',
            ],
        });
    }
    updateProfile({ userId, fullName, avatar, dateOfBirth, gender, vipId }) {
        this.userRepository.update({ id: userId }, {
            ...(0, utils_helper_1.removeNullProperty)({
                full_name: fullName,
                avatar,
                gender,
                date_of_birth: dateOfBirth,
                vip_id: vipId,
                expired_vip_at: vipId
                    ? dayjs().add(vipId, 'M').format('YYYY-MM-DD')
                    : null,
            }),
        });
    }
    async updatePassword({ userId, password, oldPassword }) {
        const user = await this.userRepository.findOne({ id: userId });
        if (user) {
            if (await (0, bcrypt_helper_1.isMatchPassword)({ password: oldPassword, hash: user.password })) {
                const hash = await (0, bcrypt_helper_1.hashPassword)(password);
                await this.userRepository.update({ id: userId }, { password: hash });
            }
            else {
                throw new common_1.HttpException({
                    context: errorContext_1.PASSWORD_INCORRECT,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
    async getListUser({ keySearch }) {
        const users = await this.userRepository
            .createQueryBuilder('user')
            .select([
            'user.id',
            'user.full_name',
            'user.email',
            'user.avatar',
            'user.date_of_birth',
            'user.gender',
            'user.role_id',
            'user.vip_id',
            'user.created_at',
        ])
            .where('user.full_name like :name', {
            name: `%${keySearch || ''}%`,
        })
            .orWhere('user.email like :email', {
            email: `%${keySearch || ''}%`,
        })
            .getMany();
        return users;
    }
    async getListAuthor({ keySearch }) {
        const authors = await this.bookRepository
            .createQueryBuilder('book')
            .select(['book.author_description'])
            .where('book.author_description like :name', {
            name: `%${keySearch || ''}%`,
        })
            .getMany();
        return authors;
    }
    async adminUpgradeVip({ userId, vipId }) {
        const user = await this.userRepository.findOne({ id: userId });
        await this.userRepository.save({
            ...user,
            vip_id: vipId,
            expired_vip_at: dayjs(user.expired_vip_at || new Date())
                .add(vipId, 'M')
                .format('YYYY-MM-DD'),
        });
    }
    async uploadAvatar({ userId, file }) {
        const dataBuffer = file.buffer;
        const filename = `${(0, uuid_1.v4)()}-${file.originalname}`;
        const mimetype = file.mimetype;
        await this.fileService.uploadFile({
            dataBuffer,
            filename,
            mimetype,
        });
        await this.userRepository.update({
            id: userId,
        }, { avatar: filename });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        book_repository_1.BookRepository,
        transaction_service_1.TransactionService,
        file_service_1.FileService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map