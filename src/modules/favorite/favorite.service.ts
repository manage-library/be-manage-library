import { FavoriteRepository } from './favorite.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class FavoriteService {
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  async favorite({ bookId, userId }) {
    const favorite = await this.favoriteRepository.find({
      book_id: bookId,
      user_id: userId,
    });

    if (favorite) {
      throw new HttpException(
        {
          context: '',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.favoriteRepository.save({
      book_id: bookId,
      user_id: userId,
    });
  }

  async unFavorite({ bookId, userId }) {
    const favorite = await this.favoriteRepository.findOne({
      book_id: bookId,
      user_id: userId,
    });

    if (!favorite) {
      throw new HttpException(
        {
          context: '',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.favoriteRepository.delete({ book_id: bookId, user_id: userId });
  }
}
