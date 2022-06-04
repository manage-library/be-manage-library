import { TransactionService } from './../transaction/transaction.service';
import { EVip } from './../../common/enums/index';
import { hashPassword } from './../../common/helpers/bcrypt.helper';
import { Injectable } from '@nestjs/common';

import { UserRepository } from '@src/modules/user/user.repository';
import * as dayjs from 'dayjs';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly transactionService: TransactionService,
  ) {}

  getProfile({ userId }) {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
      select: [
        'email',
        'full_name',
        'vip_id',
        'gender',
        'avatar',
        'date_of_birth',
        'expired_vip_at',
      ],
    });
  }

  updateProfile({ userId, fullName, avatar, dateOfBirth, gender }) {
    this.userRepository.update(
      { id: userId },
      { full_name: fullName, avatar, gender, date_of_birth: dateOfBirth },
    );
  }

  async updatePassword({ userId, password }) {
    const hash = await hashPassword(password);

    await this.userRepository.update({ id: userId }, { password: hash });
  }

  async getListUser({ keySearch }) {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.full_name',
        'user.email',
        'user.avatar',
        'user.date_of_birth',
        'user.gender',
        'user.role_id',
        'user.vip_id',
        'user.created_at',
      ])
      .where('user.full_name like :name', {
        name: `%${keySearch || ''}%`,
      })
      .orWhere('user.email like :email', {
        email: `%${keySearch || ''}%`,
      })
      .getMany();

    return users;
  }

  async getListAuthor({ keySearch }) {
    const authors = await this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.books', 'books')
      .leftJoin('books.likes', 'likes')
      .select([
        'user.id',
        'user.full_name',
        'user.email',
        'user.avatar',
        'user.date_of_birth',
        'user.gender',
        'user.vip_id',
        'user.created_at',
        'COUNT(likes.id) AS countLike',
      ])
      .where('user.full_name like :name', {
        name: `%${keySearch || ''}%`,
      })
      .orWhere('user.email like :email', {
        email: `%${keySearch || ''}%`,
      })
      .groupBy('user.id')
      .orderBy('countLike', 'DESC')
      .getRawMany();

    return authors;
  }

  async upgradeVip({
    userId,
    vipId,
    status,
  }: {
    userId: number;
    vipId: number;
    status: boolean;
  }) {
    const user = await this.userRepository.findOne({ id: userId });

    try {
      if (status) {
        await this.userRepository.save({
          ...user,
          vip_id: vipId,
          expired_vip_at: dayjs(user.expired_vip_at || new Date())
            .add(vipId, 'M')
            .format('YYYY-MM-DD'),
        });
      }

      await this.transactionService.create({
        userId,
        vipId,
        status,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
