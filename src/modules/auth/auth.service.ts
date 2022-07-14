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
import { randomString } from '@src/common/helpers/utils.helper';
import * as dayjs from 'dayjs';
import { NodeMailerService } from '../nodemailer/nodemailer.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly nodemailerService: NodeMailerService,
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
          context: 'USER_NOT_EXIST',
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

  async forgotPassword({ email }) {
    const user = await this.userRepository.findOne({
      email,
    });

    if (!user) {
      throw new HttpException(
        {
          context: 'USER_NOT_EXIST',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const code = randomString(6);

    await this.userRepository.save({
      ...user,
      code,
      code_expire_at: dayjs().add(5, 'minute').format(),
    });

    await this.nodemailerService.sendMail({ email, code });
  }

  async veriForgotPassword({ email, code, password }) {
    const user = await this.userRepository.findOne({
      email,
    });

    if (!user) {
      throw new HttpException(
        {
          context: 'USER_NOT_EXIST',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user.code !== code) {
      throw new HttpException(
        {
          context: 'CODE_NOT_VALID',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (dayjs().isAfter(dayjs(user.code_expire_at))) {
      throw new HttpException(
        {
          context: 'CODE_EXPIRED',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const hash = await hashPassword(password);

    await this.userRepository.save({
      ...user,
      password: hash,
      code: null,
      code_expire_at: null,
    });
  }
}
