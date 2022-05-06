import { HistoryRepository } from './history.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HistoryService {
  constructor(private readonly historyRepository: HistoryRepository) {}

  getList({ userId }) {
    return this.historyRepository.find({
      user_id: userId,
    });
  }

  async update({ userId, bookId, chapterId }) {
    const history = await this.historyRepository.findOne({
      user_id: userId,
      book_id: bookId,
    });

    if (!history) {
      return await this.historyRepository.save({
        user_id: userId,
        book_id: bookId,
        chapter_id: chapterId,
      });
    }

    if (history && chapterId) {
      return await this.historyRepository.save({
        ...history,
        chapter_id: chapterId,
      });
    }
  }
}
