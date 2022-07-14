import { ChapterEntity } from '@src/modules/chapter/chapter.entity';
import { UserEntity } from '@src/modules/user/user.entity';
import { BookEntity } from './../book/entity/book.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
export declare class HistoryEntity extends BaseEntity {
    id: number;
    user_id: number;
    book_id: number;
    chapter_id: number;
    book: BookEntity;
    user: UserEntity;
    chapter: ChapterEntity;
}
