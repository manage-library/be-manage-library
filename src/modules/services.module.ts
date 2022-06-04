import { TransactionModule } from './transaction/transaction.module';
import { CommentModule } from './comment/comment.module';
import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { HistoryModule } from './history/history.module';
import { UserModule } from './user/user.module';
import { ChapterModule } from './chapter/chapter.module';
import { LikeModule } from './like/like.module';
import { FavoriteModule } from './favorite/favorite.module';

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
  ],
  exports: [],
})
export class ServiceModule {}
