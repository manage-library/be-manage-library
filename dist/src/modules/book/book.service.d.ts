import { RateRepository } from './../rate/rate.repository';
import { ChapterRepository } from './../chapter/chapter.repository';
import { ChapterEntity } from '@src/modules/chapter/chapter.entity';
import { UserEntity } from '@src/modules/user/user.entity';
import { QueryBookDto } from './dto/book.dto';
import { CategoryService } from './../category/category.service';
import { ChapterService } from './../chapter/chapter.service';
import { HistoryService } from './../history/history.service';
import { CategoryRepository } from './../category/category.repository';
import { BookRepository } from './repository/book.repository';
import { BookCategoryRepository } from './repository/bookCategory.repository';
export declare class BookService {
    private readonly categoryRepository;
    private readonly bookRepository;
    private readonly chapterRepository;
    private readonly bookCategoryRepository;
    private readonly historyService;
    private readonly chapterService;
    private readonly categoryService;
    private readonly rateRepository;
    constructor(categoryRepository: CategoryRepository, bookRepository: BookRepository, chapterRepository: ChapterRepository, bookCategoryRepository: BookCategoryRepository, historyService: HistoryService, chapterService: ChapterService, categoryService: CategoryService, rateRepository: RateRepository);
    getList({ query, userId }: {
        query: QueryBookDto;
        userId: number;
    }): Promise<{
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
        author: UserEntity;
        bookCategory: import("./entity/bookCategory.entity").BookCategoryEntity[];
        chapters: ChapterEntity[];
        comments: import("../comment/comment.entity").CommentEntity[];
        downloads: import("../download/download.entity").DownloadEntity[];
        favorites: import("../favorite/favorite.entity").FavoriteEntity[];
        likes: import("../like/like.entity").LikeEntity[];
        rates: import("../rate/rate.entity").RateEntity[];
        histories: import("../history/history.entity").HistoryEntity[];
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getOne({ userId, bookId, page, perPage }: {
        userId: any;
        bookId: any;
        page?: number;
        perPage?: number;
    }): Promise<{
        chapters: ChapterEntity[];
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
        author: UserEntity;
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
    downloadFile({ userId, bookId }: {
        userId: any;
        bookId: any;
    }): Promise<{
        buffer: string;
        book: string;
    }>;
    create({ name, description, authorDescription, image, releaseStatus, isVisible, isVip, authorId, categoryIds, }: {
        name: any;
        description: any;
        authorDescription: any;
        image: any;
        releaseStatus: any;
        isVisible: any;
        isVip: any;
        authorId: any;
        categoryIds: any;
    }): Promise<void>;
    update({ bookId, name, description, authorDescription, releaseStatus, isVisible, categoryIds, }: {
        bookId: any;
        name: any;
        description: any;
        authorDescription: any;
        releaseStatus: any;
        isVisible: any;
        categoryIds: any;
    }): Promise<void>;
    crawl({ userId }: {
        userId: any;
    }): Promise<void>;
}
