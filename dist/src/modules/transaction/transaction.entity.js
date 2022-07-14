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
exports.TransactionEntity = void 0;
const user_entity_1 = require("../user/user.entity");
const base_entity_1 = require("../../common/entities/base.entity");
const typeorm_1 = require("typeorm");
let TransactionEntity = class TransactionEntity extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { name: 'id' }),
    __metadata("design:type", Number)
], TransactionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'vip_id' }),
    __metadata("design:type", Number)
], TransactionEntity.prototype, "vip_id", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'status' }),
    __metadata("design:type", Number)
], TransactionEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'amount' }),
    __metadata("design:type", Number)
], TransactionEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'code' }),
    __metadata("design:type", String)
], TransactionEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'user_id' }),
    __metadata("design:type", Number)
], TransactionEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.UserEntity, (user) => user.transactions),
    (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], TransactionEntity.prototype, "user", void 0);
TransactionEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'transactions' })
], TransactionEntity);
exports.TransactionEntity = TransactionEntity;
//# sourceMappingURL=transaction.entity.js.map