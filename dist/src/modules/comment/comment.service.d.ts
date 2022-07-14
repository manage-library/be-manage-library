import { CommentRepository } from './comment.repository';
export declare class CommentService {
    private readonly commentRepository;
    constructor(commentRepository: CommentRepository);
    getList({ bookId }: {
        bookId: any;
    }): Promise<import("./comment.entity").CommentEntity[]>;
    create({ bookId, userId, content }: {
        bookId: any;
        userId: any;
        content: any;
    }): Promise<{
        book_id: any;
        user_id: any;
        content: any;
    } & import("./comment.entity").CommentEntity>;
    update({ bookId, userId, commentId, content }: {
        bookId: any;
        userId: any;
        commentId: any;
        content: any;
    }): Promise<import("typeorm").UpdateResult>;
    remove({ bookId, userId, commentId }: {
        bookId: any;
        userId: any;
        commentId: any;
    }): Promise<import("typeorm").DeleteResult>;
}
