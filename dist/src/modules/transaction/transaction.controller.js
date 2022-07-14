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
exports.TransactionController = void 0;
const jwt_guard_1 = require("../../guards/jwt.guard");
const transaction_dto_1 = require("./dto/transaction.dto");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const transaction_service_1 = require("./transaction.service");
let TransactionController = class TransactionController {
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    getAllTransaction(query) {
        const { userId, vipId, status } = query;
        return this.transactionService.getAll({ userId, vipId, status });
    }
    createTransaction(req, body) {
        const userId = req.user.userId;
        const { vipId } = body;
        return this.transactionService.create({ userId, vipId });
    }
    async payment(req, body, res) {
        const { comment, signature } = body;
        await this.transactionService.recharge({ code: comment, signature });
        res.status(200).json();
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transaction_dto_1.GetTransactionDto]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "getAllTransaction", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, transaction_dto_1.CreateTransactionDto]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "createTransaction", null);
__decorate([
    (0, common_1.Post)('payment-bill'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, transaction_dto_1.RechargeDto, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "payment", null);
TransactionController = __decorate([
    (0, swagger_1.ApiTags)('Transaction'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('transactions'),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService])
], TransactionController);
exports.TransactionController = TransactionController;
//# sourceMappingURL=transaction.controller.js.map