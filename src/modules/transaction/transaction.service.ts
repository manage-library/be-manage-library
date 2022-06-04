import { vipAmount } from './../../common/enums/index';
import { Injectable } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  getAll({ userId, status, vipId }) {
    const transaction =
      this.transactionRepository.createQueryBuilder('transaction');

    if (userId) {
      transaction.where('transaction.user_id = :userId', { userId });
    }

    if (typeof status === 'boolean') {
      transaction.andWhere('transaction.status = :status', { status });
    }

    if (vipId) {
      transaction.andWhere('transaction.vip_id = :vipId', { vipId });
    }

    return transaction.getMany();
  }

  create({ userId, vipId, status }) {
    return this.transactionRepository.save({
      user_id: userId,
      vip_id: vipId,
      amount: vipAmount[vipId],
      status,
    });
  }
}
