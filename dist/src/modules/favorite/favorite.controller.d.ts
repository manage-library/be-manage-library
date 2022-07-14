import { FavoriteService } from './favorite.service';
import { Request } from 'express';
export declare class FavoriteController {
    private readonly favoriteService;
    constructor(favoriteService: FavoriteService);
    favorite(req: Request): Promise<void>;
    getList(req: Request): Promise<import("./favorite.entity").FavoriteEntity[]>;
    unFavorite(req: Request): Promise<void>;
}
