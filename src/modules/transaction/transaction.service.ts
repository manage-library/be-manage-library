import { ECTransactionStatus, vipAmount } from './../../common/enums/index';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';
import { AUTH_FAILED } from '@src/constants/errorContext';
import { UserRepository } from '../user/user.repository';
import * as dayjs from 'dayjs';
import { randomString } from '@src/common/helpers/utils.helper';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly userRepository: UserRepository,
  ) {}

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

  create({ userId, vipId }) {
    const code = randomString(12);

    return this.transactionRepository.save({
      user_id: userId,
      vip_id: vipId,
      amount: vipAmount[vipId],
      code,
      status: ECTransactionStatus.PENDING,
    });
  }

  async recharge({ code, signature }) {
    if (signature !== process.env.SIGNATURE) {
      return;
    }

    const transaction = await this.transactionRepository.findOne({
      code,
      status: ECTransactionStatus.PENDING,
    });

    if (!transaction) {
      return;
    }

    const user = await this.userRepository.findOne({ id: transaction.user_id });

    if (!user) {
      return;
    }

    await this.userRepository.save({
      ...user,
      vip_id: transaction.vip_id,
      expired_vip_at: dayjs(user.expired_vip_at || new Date())
        .add(transaction.vip_id, 'M')
        .format('YYYY-MM-DD'),
    });

    await this.transactionRepository.save({
      ...transaction,
      status: ECTransactionStatus.APPROVED,
    });
  }
}
