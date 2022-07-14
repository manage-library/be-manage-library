import { EReleaseStatus, ESortBy, ESortType } from '@src/common/enums';
export declare class CreateChapterRequestDto {
    name: string;
    description: string;
    content: string;
}
export declare class UpdateChapterRequestDto {
    name: string;
    description: string;
    content: string;
}
export declare class CreateBookRequestDto {
    name: string;
    description: string;
    authorDescription: string;
    image: string;
    releaseStatus: EReleaseStatus;
    isVisible: boolean;
    isVip: boolean;
    categoryIds: number[];
}
export declare class UpdateBookRequestDto {
    name: string;
    description: string;
    authorDescription: string;
    image: string;
    releaseStatus: EReleaseStatus;
    isVisible: boolean;
    categoryIds: number[];
}
export declare class CrawlBook {
    data: any;
}
export declare class QueryBookDto {
    bookName: string;
    authorName: string;
    categoryId: number;
    categoryName: number;
    isVip: boolean;
    releaseStatus: EReleaseStatus;
    sortBy: ESortBy;
    sortType: ESortType;
}
