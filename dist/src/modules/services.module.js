"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceModule = void 0;
const rate_module_1 = require("./rate/rate.module");
const transaction_module_1 = require("./transaction/transaction.module");
const comment_module_1 = require("./comment/comment.module");
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const book_module_1 = require("./book/book.module");
const category_module_1 = require("./category/category.module");
const history_module_1 = require("./history/history.module");
const user_module_1 = require("./user/user.module");
const chapter_module_1 = require("./chapter/chapter.module");
const like_module_1 = require("./like/like.module");
const favorite_module_1 = require("./favorite/favorite.module");
let ServiceModule = class ServiceModule {
};
ServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            chapter_module_1.ChapterModule,
            book_module_1.BookModule,
            category_module_1.CategoryModule,
            history_module_1.HistoryModule,
            like_module_1.LikeModule,
            favorite_module_1.FavoriteModule,
            comment_module_1.CommentModule,
            transaction_module_1.TransactionModule,
            rate_module_1.RateModule,
        ],
        exports: [],
    })
], ServiceModule);
exports.ServiceModule = ServiceModule;
//# sourceMappingURL=services.module.js.map