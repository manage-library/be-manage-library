import { CreateChapterRequestDto, UpdateChapterRequestDto } from './dto/book.dto';
import { ChapterService } from './chapter.service';
import { Request } from 'express';
export declare class ChapterController {
    private readonly chapterService;
    constructor(chapterService: ChapterService);
    create(req: Request, body: CreateChapterRequestDto[]): Promise<void>;
    getOne(req: Request): Promise<{
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
    update(req: Request, body: UpdateChapterRequestDto): Promise<void>;
    remove(req: Request): Promise<void>;
}
