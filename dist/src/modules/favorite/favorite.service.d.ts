import { FavoriteRepository } from './favorite.repository';
export declare class FavoriteService {
    private readonly favoriteRepository;
    constructor(favoriteRepository: FavoriteRepository);
    favorite({ bookId, userId }: {
        bookId: any;
        userId: any;
    }): Promise<void>;
    unFavorite({ bookId, userId }: {
        bookId: any;
        userId: any;
    }): Promise<void>;
}
