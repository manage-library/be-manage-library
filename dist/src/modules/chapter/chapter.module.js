"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChapterModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const chapter_service_1 = require("./chapter.service");
const chapter_repository_1 = require("./chapter.repository");
const common_1 = require("@nestjs/common");
const history_module_1 = require("../history/history.module");
const chapter_controller_1 = require("./chapter.controller");
let ChapterModule = class ChapterModule {
};
ChapterModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([chapter_repository_1.ChapterRepository]),
            history_module_1.HistoryModule,
        ],
        controllers: [chapter_controller_1.ChapterController],
        providers: [chapter_service_1.ChapterService],
        exports: [chapter_service_1.ChapterService],
    })
], ChapterModule);
exports.ChapterModule = ChapterModule;
//# sourceMappingURL=chapter.module.js.map