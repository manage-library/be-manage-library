import { BookRepository } from './../book/repository/book.repository';
import { PASSWORD_INCORRECT } from './../../constants/errorContext';
import { TransactionService } from './../transaction/transaction.service';
import { EVip } from './../../common/enums/index';
import {
  hashPassword,
  isMatchPassword,
} from './../../common/helpers/bcrypt.helper';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { UserRepository } from '@src/modules/user/user.repository';
import * as dayjs from 'dayjs';
import { removeNullProperty } from '@src/common/helpers/utils.helper';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bookRepository: BookRepository,
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

  updateProfile({ userId, fullName, avatar, dateOfBirth, gender, vipId }) {
    this.userRepository.update(
      { id: userId },
      {
        ...removeNullProperty({
          full_name: fullName,
          avatar,
          gender,
          date_of_birth: dateOfBirth,
          vip_id: vipId,
          expired_vip_at: vipId
            ? dayjs().add(vipId, 'M').format('YYYY-MM-DD')
            : null,
        }),
      },
    );
  }

  async updatePassword({ userId, password, oldPassword }) {
    const user = await this.userRepository.findOne({ id: userId });

    if (user) {
      if (
        await isMatchPassword({ password: oldPassword, hash: user.password })
      ) {
        const hash = await hashPassword(password);

        await this.userRepository.update({ id: userId }, { password: hash });
      } else {
        throw new HttpException(
          {
            context: PASSWORD_INCORRECT,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
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
    const authors = await this.bookRepository
      .createQueryBuilder('book')
      .select(['book.author_description'])
      .where('book.author_description like :name', {
        name: `%${keySearch || ''}%`,
      })
      .getMany();

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
