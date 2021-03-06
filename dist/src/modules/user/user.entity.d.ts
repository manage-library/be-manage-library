import { RateEntity } from './../rate/rate.entity';
import { LikeEntity } from './../like/like.entity';
import { TransactionEntity } from './../transaction/transaction.entity';
import { HistoryEntity } from './../history/history.entity';
import { FavoriteEntity } from './../favorite/favorite.entity';
import { DownloadEntity } from './../download/download.entity';
import { CommentEntity } from './../comment/comment.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
import { BookEntity } from './../book/entity/book.entity';
export declare class UserEntity extends BaseEntity {
    id: number;
    full_name: string;
    email: string;
    password: string;
    date_of_birth: Date;
    gender: number;
    avatar: string;
    code: string;
    code_expire_at: Date;
    role_id: number;
    vip_id: number;
    expired_vip_at: Date;
    books: BookEntity[];
    comments: CommentEntity[];
    downloads: DownloadEntity[];
    favorites: FavoriteEntity[];
    likes: LikeEntity[];
    rates: RateEntity[];
    histories: HistoryEntity[];
    transactions: TransactionEntity[];
}
