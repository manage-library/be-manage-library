"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const nodemailer_module_1 = require("./../nodemailer/nodemailer.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const user_repository_1 = require("../user/user.repository");
const jwt_strategy_1 = require("../../guards/jwt.strategy");
const jwt_guard_1 = require("../../guards/jwt.guard");
const EnvKey_1 = require("./../../constants/EnvKey");
const repositories = [user_repository_1.UserRepository];
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature(repositories),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get(EnvKey_1.ACCESS_TOKEN_SECRET),
                    signOptions: { expiresIn: configService.get(EnvKey_1.ACCESS_TOKEN_SECRET) },
                }),
            }),
            nodemailer_module_1.NodeMailModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, jwt_guard_1.JwtGuard],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map