import { RateRepository } from './rate.repository';
export declare class RateService {
    private readonly rateRepository;
    constructor(rateRepository: RateRepository);
    create({ bookId, userId, rate, content }: {
        bookId: any;
        userId: any;
        rate: any;
        content: any;
    }): Promise<{
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
