import { CommentRepository } from './comment.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  getList({ bookId }) {
    return this.commentRepository.find({
      book_id: bookId,
    });
  }

  create({ bookId, userId, content }) {
    try {
      console.log({ bookId, userId, content });
      return this.commentRepository.save({
        book_id: bookId,
        user_id: userId,
        content,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async update({ bookId, userId, commentId, content }) {
    const comment = await this.commentRepository.findOne({
      id: commentId,
      book_id: bookId,
      user_id: userId,
    });

    if (!comment) {
      throw new HttpException(
        {
          context: '',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.commentRepository.update(
      { id: commentId, user_id: userId, book_id: bookId },
      {
        content,
      },
    );
  }

  async remove({ bookId, userId, commentId }) {
    const comment = await this.commentRepository.findOne({
      id: commentId,
      book_id: bookId,
      user_id: userId,
    });

    if (!comment) {
      throw new HttpException(
        {
          context: '',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.commentRepository.delete({
      id: commentId,
    });
  }
}
