import { hashPassword } from './../../common/helpers/bcrypt.helper';
import { Injectable } from '@nestjs/common';

import { UserRepository } from '@src/modules/user/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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
}
