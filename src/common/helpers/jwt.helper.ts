import {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRE,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRE,
} from './../../constants/EnvKey';
import { ConfigService } from '@nestjs/config';
import { sign } from 'jsonwebtoken';

export function generateToken(
  data: any,
  configService: ConfigService,
): {
  accessToken: string;
  refreshToken: string;
} {
  const accessToken = sign(data, configService.get(ACCESS_TOKEN_SECRET), {
    algorithm: 'HS256',
    expiresIn: configService.get(ACCESS_TOKEN_EXPIRE),
  });

  const refreshToken = sign(data, configService.get(REFRESH_TOKEN_SECRET), {
    algorithm: 'HS256',
    expiresIn: configService.get(REFRESH_TOKEN_EXPIRE),
  });

  return { accessToken, refreshToken };
}
