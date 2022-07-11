import { LikeRepository } from './like.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class LikeService {
  constructor(private readonly likeRepository: LikeRepository) {}

  async like({ bookId, userId }) {
    const like = await this.likeRepository.findOne({
      book_id: bookId,
      user_id: userId,
    });

    if (like) {
      await this.likeRepository.delete(like);
      return;
    }

    await this.likeRepository.save({
      book_id: bookId,
      user_id: userId,
    });
  }

  async unLike({ bookId, userId }) {
    const like = await this.likeRepository.findOne({
      book_id: bookId,
      user_id: userId,
    });

    if (!like) {
      throw new HttpException(
        {
          context: '',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.likeRepository.delete(like);
  }
}
