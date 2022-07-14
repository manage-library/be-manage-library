import { LikeService } from './like.service';
import { Request } from 'express';
export declare class LikeController {
    private readonly likeService;
    constructor(likeService: LikeService);
    like(req: Request): Promise<void>;
    unlike(req: Request): Promise<void>;
}
