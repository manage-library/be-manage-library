import { BookCategoryEntity } from '../book/entity/bookCategory.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
export declare class CategoryEntity extends BaseEntity {
    id: number;
    name: string;
    bookCategory: BookCategoryEntity[];
}
