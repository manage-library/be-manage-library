import { Logger } from './../common/helpers/logger';
import { RateModule } from './rate/rate.module';
import { TransactionModule } from './transaction/transaction.module';
import { CommentModule } from './comment/comment.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { HistoryModule } from './history/history.module';
import { UserModule } from './user/user.module';
import { ChapterModule } from './chapter/chapter.module';
import { LikeModule } from './like/like.module';
import { FavoriteModule } from './favorite/favorite.module';
import { AppMiddleware } from '@src/middlewares';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ChapterModule,
    BookModule,
    CategoryModule,
    HistoryModule,
    LikeModule,
    FavoriteModule,
    CommentModule,
    TransactionModule,
    RateModule,
  ],
  providers: [Logger],
  exports: [],
})
export class ServiceModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppMiddleware).forRoutes('*');
  }
}
