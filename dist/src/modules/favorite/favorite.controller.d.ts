import { FavoriteService } from './favorite.service';
import { Request } from 'express';
export declare class FavoriteController {
    private readonly favoriteService;
    constructor(favoriteService: FavoriteService);
    favorite(req: Request): Promise<void>;
    unFavorite(req: Request): Promise<void>;
}
