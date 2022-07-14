import { CategoryEntity } from '../../category/category.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
import { BookEntity } from './book.entity';
export declare class BookCategoryEntity extends BaseEntity {
    id: number;
    book_id: number;
    category_id: number;
    book: BookEntity;
    category: CategoryEntity;
}
