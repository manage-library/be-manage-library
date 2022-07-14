import { HistoryService } from '../history/history.service';
import { ChapterRepository } from './chapter.repository';
export declare class ChapterService {
    private readonly chapterRepository;
    private readonly historyService;
    constructor(chapterRepository: ChapterRepository, historyService: HistoryService);
    getOne({ userId, bookId, chapterId }: {
        userId: any;
        bookId: any;
        chapterId: any;
    }): Promise<{
        preChap: number;
        nextChap: number;
        id: number;
        name: string;
        description: string;
        content: string;
        book_id: number;
        book: import("../book/entity/book.entity").BookEntity;
        histories: import("../history/history.entity").HistoryEntity[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    create({ bookId, chapters }: {
        bookId: any;
        chapters: any;
    }): Promise<void>;
    update({ bookId, chapterId, name, description, content }: {
        bookId: any;
        chapterId: any;
        name: any;
        description: any;
        content: any;
    }): Promise<void>;
    remove({ bookId, chapterId }: {
        bookId: any;
        chapterId: any;
    }): Promise<void>;
}
