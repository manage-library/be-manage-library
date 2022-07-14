import { PaginateDto } from './../../dto/paginate';
import { CreateBookRequestDto, QueryBookDto, UpdateBookRequestDto } from './dto/book.dto';
import { BookService } from './book.service';
import { Request, Response } from 'express';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    getList(req: Request, query: QueryBookDto): Promise<{
        books: {
            rate: {
                value: number;
                count: number;
            };
            id: number;
            name: string;
            description: string;
            image: string;
            is_vip: boolean;
            is_visible: boolean;
            release_status: number;
            author_id: number;
            author_description: number;
            author: import("../user/user.entity").UserEntity;
            bookCategory: import("./entity/bookCategory.entity").BookCategoryEntity[];
            chapters: import("../chapter/chapter.entity").ChapterEntity[];
            comments: import("../comment/comment.entity").CommentEntity[];
            downloads: import("../download/download.entity").DownloadEntity[];
            favorites: import("../favorite/favorite.entity").FavoriteEntity[];
            likes: import("../like/like.entity").LikeEntity[];
            rates: import("../rate/rate.entity").RateEntity[];
            histories: import("../history/history.entity").HistoryEntity[];
            createdAt: Date;
            updatedAt: Date;
        }[];
        total: number;
    }>;
    getOne(req: Request, { page, perPage }: PaginateDto): Promise<{
        chapters: import("../chapter/chapter.entity").ChapterEntity[];
        rate: {
            value: number;
            count: number;
        };
        id: number;
        name: string;
        description: string;
        image: string;
        is_vip: boolean;
        is_visible: boolean;
        release_status: number;
        author_id: number;
        author_description: number;
        author: import("../user/user.entity").UserEntity;
        bookCategory: import("./entity/bookCategory.entity").BookCategoryEntity[];
        comments: import("../comment/comment.entity").CommentEntity[];
        downloads: import("../download/download.entity").DownloadEntity[];
        favorites: import("../favorite/favorite.entity").FavoriteEntity[];
        likes: import("../like/like.entity").LikeEntity[];
        rates: import("../rate/rate.entity").RateEntity[];
        histories: import("../history/history.entity").HistoryEntity[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    downloadFile(req: Request, res: Response): Promise<void>;
    create(req: Request, body: CreateBookRequestDto): Promise<void>;
    update(req: Request, body: UpdateBookRequestDto): Promise<void>;
    crawl(req: Request): Promise<void>;
}
