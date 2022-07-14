import { BookEntity } from './../book/entity/book.entity';
import { HistoryEntity } from '../history/history.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
export declare class ChapterEntity extends BaseEntity {
    id: number;
    name: string;
    description: string;
    content: string;
    book_id: number;
    book: BookEntity;
    histories: HistoryEntity[];
}
