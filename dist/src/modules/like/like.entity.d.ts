import { UserEntity } from '@src/modules/user/user.entity';
import { BookEntity } from '../book/entity/book.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
export declare class LikeEntity extends BaseEntity {
    id: number;
    user_id: number;
    book_id: number;
    book: BookEntity;
    user: UserEntity;
}
