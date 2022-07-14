import { HistoryRepository } from './history.repository';
export declare class HistoryService {
    private readonly historyRepository;
    constructor(historyRepository: HistoryRepository);
    getList({ userId }: {
        userId: any;
    }): Promise<import("./history.entity").HistoryEntity[]>;
    update({ userId, bookId, chapterId }: {
        userId: any;
        bookId: any;
        chapterId: any;
    }): Promise<({
        user_id: any;
        book_id: any;
        chapter_id: any;
    } & import("./history.entity").HistoryEntity) | ({
        chapter_id: any;
        id: number;
        user_id: number;
        book_id: number;
        book: import("../book/entity/book.entity").BookEntity;
        user: import("../user/user.entity").UserEntity;
        chapter: import("../chapter/chapter.entity").ChapterEntity;
        createdAt: Date;
        updatedAt: Date;
    } & import("./history.entity").HistoryEntity)>;
}
