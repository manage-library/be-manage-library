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
exports.RateService = void 0;
const rate_repository_1 = require("./rate.repository");
const common_1 = require("@nestjs/common");
let RateService = class RateService {
    constructor(rateRepository) {
        this.rateRepository = rateRepository;
    }
    async create({ bookId, userId, rate, content }) {
        const record = await this.rateRepository.findOne({
            book_id: bookId,
            user_id: userId,
        });
        if (record) {
            return this.rateRepository.save({ ...record, rate, content });
        }
        await this.rateRepository.save({
            book_id: bookId,
            user_id: userId,
            rate,
            content,
        });
    }
};
RateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [rate_repository_1.RateRepository])
], RateService);
exports.RateService = RateService;
//# sourceMappingURL=rate.service.js.map