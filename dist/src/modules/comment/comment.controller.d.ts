import { CommentService } from './comment.service';
import { Request } from 'express';
import { CommentDto } from './dto/comment.dto';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(req: Request, body: CommentDto): Promise<{
        book_id: any;
        user_id: any;
        content: any;
    } & import("./comment.entity").CommentEntity>;
    getList(req: Request): Promise<import("./comment.entity").CommentEntity[]>;
    update(req: Request, body: CommentDto): Promise<import("typeorm").UpdateResult>;
    remove(req: Request): Promise<import("typeorm").DeleteResult>;
}
