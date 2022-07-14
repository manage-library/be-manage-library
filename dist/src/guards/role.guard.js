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
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./../modules/user/user.entity");
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        const requireRoles = this.reflector.getAllAndOverride('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requireRoles) {
            return true;
        }
        const req = context.switchToHttp().getRequest();
        const userId = req?.user?.userId;
        const user = await this.getUser(userId);
        return user && requireRoles.includes(user.role_id) ? true : false;
    }
    getUser(userId) {
        return (0, typeorm_1.getRepository)(user_entity_1.UserEntity)
            .createQueryBuilder('users')
            .where('users.id = :userId', { userId })
            .getOne();
    }
};
RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=role.guard.js.map