import { LikeRepository } from './like.repository';
export declare class LikeService {
    private readonly likeRepository;
    constructor(likeRepository: LikeRepository);
    like({ bookId, userId }: {
        bookId: any;
        userId: any;
    }): Promise<void>;
    unLike({ bookId, userId }: {
        bookId: any;
        userId: any;
    }): Promise<void>;
}
