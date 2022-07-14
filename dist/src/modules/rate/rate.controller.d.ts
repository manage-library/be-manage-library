import { RateService } from './rate.service';
import { Request } from 'express';
declare class RateDto {
    rate: number;
    content: string;
}
export declare class RateController {
    private readonly rateService;
    constructor(rateService: RateService);
    create(req: Request, body: RateDto): Promise<{
        rate: any;
        content: any;
        id: number;
        user_id: number;
        book_id: number;
        book: import("../book/entity/book.entity").BookEntity;
        user: import("../user/user.entity").UserEntity;
        createdAt: Date;
        updatedAt: Date;
    } & import("./rate.entity").RateEntity>;
}
export {};
