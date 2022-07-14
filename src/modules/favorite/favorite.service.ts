import { FavoriteRepository } from './favorite.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class FavoriteService {
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  async favorite({ bookId, userId }) {
    const favorite = await this.favoriteRepository.findOne({
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

  async getList({ userId }) {
    const favorite = await this.favoriteRepository
      .createQueryBuilder('favorite')
      .where('favorite.user_id = :userId', { userId })
      .leftJoinAndSelect('favorite.book', 'book')
      .getMany();

    return favorite;
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
