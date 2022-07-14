import { EReleaseStatus } from '@src/common/enums';
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
    releaseStatus: EReleaseStatus;
    isVisible: boolean;
    isVip: boolean;
    categoryIds: number[];
    chapters: CreateChapterRequestDto[];
}
export declare class UpdateBookRequestDto {
    name: string;
    description: string;
    releaseStatus: EReleaseStatus;
    isVisible: boolean;
    categoryIds: number[];
}
