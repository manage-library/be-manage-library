import { HistoryService } from '../history/history.service';
import { ChapterRepository } from './chapter.repository';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ChapterService {
  constructor(
    private readonly chapterRepository: ChapterRepository,
    private readonly historyService: HistoryService,
  ) {}

  async getOne({ userId, bookId, chapterId }) {
    const chapter = await this.chapterRepository.findOne({
      id: chapterId,
      book_id: bookId,
    });

    if (!chapter) {
      throw new HttpException(
        {
          context: '',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const nextChap = await this.chapterRepository
      .createQueryBuilder('chapter')
      .select('chapter.id')
      .where(`chapter.id > :id`, { id: chapter.id })
      .andWhere('chapter.book_id = :bookId', { bookId })
      .getOne();

    const preChap = await this.chapterRepository
      .createQueryBuilder('chapter') 
      .select('chapter.id')
      .where(`chapter.id < :id`, { id: chapter.id })
      .andWhere('chapter.book_id = :bookId', { bookId })
      .orderBy('id', 'DESC')
      .getOne();

    await this.historyService.update({
      userId,
      bookId,
      chapterId,
    });

    return {
      ...chapter,
      preChap: preChap?.id || null,
      nextChap: nextChap?.id || null,
    };
  }

  async create({ bookId, chapters }) {
    await this.chapterRepository.save(
      chapters.map((chapter) => ({ ...chapter, book_id: bookId })),
    );
  }

  async update({ bookId, chapterId, name, description, content }) {
    const chapter = await this.chapterRepository.findOne({
      book_id: bookId,
      id: chapterId,
    });

    if (!chapter) {
      throw new HttpException(
        {
          context: '',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.chapterRepository.update(
      { id: chapterId, book_id: bookId },
      {
        name,
        description,
        content,
      },
    );
  }

  async remove({ bookId, chapterId }) {
    const chapter = await this.chapterRepository.findOne({
      id: chapterId,
      book_id: bookId,
    });

    if (!chapter) {
      throw new HttpException(
        {
          context: '',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.chapterRepository.delete(chapter);
  }
}
