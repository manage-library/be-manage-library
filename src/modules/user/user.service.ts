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
      select: ['email', 'full_name', 'vip_id'],
    });
  }

  updateProfile({ userId, fullName }) {
    this.userRepository.update({ id: userId }, { full_name: fullName });
  }

  async updatePassword({ userId, password }) {
    const hash = await hashPassword(password);

    await this.userRepository.update({ id: userId }, { password: hash });
  }
}
