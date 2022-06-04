import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UserRepository } from '@src/modules/user/user.repository';
import { generateToken } from '@src/common/helpers/jwt.helper';
import { AUTH_FAILED } from '../../constants/errorContext';
import {
  hashPassword,
  isMatchPassword,
} from './../../common/helpers/bcrypt.helper';
import { ERole, EVip } from '../../common/enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  async login({ email, password }) {
    const user = await this.userRepository.findOne({ email });

    if (user && (await isMatchPassword({ password, hash: user.password }))) {
      const { accessToken } = generateToken(
        {
          userId: user.id,
        },
        this.configService,
      );

      return { accessToken };
    }

    throw new HttpException(
      {
        context: AUTH_FAILED,
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  async register({ email, password, fullName }) {
    const user = await this.userRepository.findOne({
      email,
    });

    if (user) {
      throw new HttpException(
        {
          context: '',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const hash = await hashPassword(password);

    await this.userRepository.save({
      email,
      password: hash,
      full_name: fullName,
      role_id: ERole.USER,
      vip_id: EVip.VIP_0,
    });
  }
}
