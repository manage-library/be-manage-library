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
exports.TransactionService = void 0;
const index_1 = require("./../../common/enums/index");
const common_1 = require("@nestjs/common");
const transaction_repository_1 = require("./transaction.repository");
const user_repository_1 = require("../user/user.repository");
const dayjs = require("dayjs");
const utils_helper_1 = require("../../common/helpers/utils.helper");
let TransactionService = class TransactionService {
    constructor(transactionRepository, userRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }
    getAll({ userId, status, vipId }) {
        const transaction = this.transactionRepository.createQueryBuilder('transaction');
        if (userId) {
            transaction.where('transaction.user_id = :userId', { userId });
        }
        if (typeof status === 'boolean') {
            transaction.andWhere('transaction.status = :status', { status });
        }
        if (vipId) {
            transaction.andWhere('transaction.vip_id = :vipId', { vipId });
        }
        return transaction.getMany();
    }
    create({ userId, vipId }) {
        const code = (0, utils_helper_1.randomString)(12);
        return this.transactionRepository.save({
            user_id: userId,
            vip_id: vipId,
            amount: index_1.vipAmount[vipId],
            code,
            status: index_1.ECTransactionStatus.PENDING,
        });
    }
    async recharge({ code, signature }) {
        if (signature !== process.env.SIGNATURE) {
            return;
        }
        const transaction = await this.transactionRepository.findOne({
            code: code.split('bk-')[1],
            status: index_1.ECTransactionStatus.PENDING,
        });
        if (!transaction) {
            return;
        }
        const user = await this.userRepository.findOne({ id: transaction.user_id });
        if (!user) {
            return;
        }
        await this.userRepository.save({
            ...user,
            vip_id: transaction.vip_id,
            expired_vip_at: dayjs(user.expired_vip_at || new Date())
                .add(transaction.vip_id, 'M')
                .format('YYYY-MM-DD'),
        });
        await this.transactionRepository.save({
            ...transaction,
            status: index_1.ECTransactionStatus.APPROVED,
        });
    }
};
TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [transaction_repository_1.TransactionRepository,
        user_repository_1.UserRepository])
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map