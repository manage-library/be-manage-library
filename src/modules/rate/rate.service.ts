import { RateRepository } from './rate.repository';
import { Injectable } from '@nestjs/common';
import { Like } from 'typeorm';

@Injectable()
export class RateService {
  constructor(private readonly rateRepository: RateRepository) {}

  async create({ bookId, userId, rate, content }) {
    const record = await this.rateRepository.findOne({
      book_id: bookId,
      user_id: userId,
    });

    if (record) {
      return this.rateRepository.save({ ...record, rate, content });
    }

    await this.rateRepository.save({
      book_id: bookId,
      user_id: userId,
      rate,
      content,
    });
  }
}
