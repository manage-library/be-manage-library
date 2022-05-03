import { Injectable } from '@nestjs/common';

import { UserRepository } from '@src/modules/user/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getOne(userId: number) {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
  }
}
