import { RateEntity } from './../../rate/rate.entity';
import { LikeEntity } from './../../like/like.entity';
import { HistoryEntity } from './../../history/history.entity';
import { DownloadEntity } from './../../download/download.entity';
import { CommentEntity } from './../../comment/comment.entity';
import { UserEntity } from '@src/modules/user/user.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
import { BookCategoryEntity } from './bookCategory.entity';
import { ChapterEntity } from '@src/modules/chapter/chapter.entity';
import { FavoriteEntity } from '@src/modules/favorite/favorite.entity';
export declare class BookEntity extends BaseEntity {
    id: number;
    name: string;
    description: string;
    image: string;
    is_vip: boolean;
    is_visible: boolean;
    release_status: number;
    author_id: number;
    author_description: number;
    author: UserEntity;
    bookCategory: BookCategoryEntity[];
    chapters: ChapterEntity[];
    comments: CommentEntity[];
    downloads: DownloadEntity[];
    favorites: FavoriteEntity[];
    likes: LikeEntity[];
    rates: RateEntity[];
    histories: HistoryEntity[];
}
