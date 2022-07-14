"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateModule = void 0;
const rate_service_1 = require("./rate.service");
const rate_controller_1 = require("./rate.controller");
const rate_repository_1 = require("./rate.repository");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
let RateModule = class RateModule {
};
RateModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([rate_repository_1.RateRepository])],
        controllers: [rate_controller_1.RateController],
        providers: [rate_service_1.RateService],
    })
], RateModule);
exports.RateModule = RateModule;
//# sourceMappingURL=rate.module.js.map