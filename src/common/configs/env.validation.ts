import { plainToClass } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

export function envValidate(config: Record<string, any>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

export enum DB_TYPE {
  mysql = 'mysql',
}

class EnvironmentVariables {
  @IsOptional()
  NODE_ENV: string;

  @IsNumber()
  @IsOptional()
  PORT: number;

  @IsString()
  @IsOptional()
  HOST: string;

  @IsString()
  @IsOptional()
  ACCESS_TOKEN_SECRET: string;

  @IsString()
  @IsOptional()
  ACCESS_TOKEN_EXPIRE: string;

  @IsString()
  @IsOptional()
  REFRESH_TOKEN_SECRET: string;

  @IsString()
  @IsOptional()
  REFRESH_TOKEN_EXPIRE: string;

  @IsNumber()
  @IsOptional()
  PAYMENT_PORT: number;

  @IsString()
  @IsOptional()
  PAYMENT_HOST: string;

  @IsEnum(DB_TYPE)
  @IsOptional()
  DB_TYPE: DB_TYPE.mysql;

  @IsString()
  @IsOptional()
  DB_HOST: string;

  @IsNumber()
  @IsOptional()
  DB_PORT: number;

  @IsString()
  @IsOptional()
  MYSQL_ROOT_PASSWORD: string;

  @IsString()
  @IsOptional()
  MYSQL_USER: string;

  @IsString()
  @IsOptional()
  MYSQL_PASSWORD: string;

  @IsString()
  @IsOptional()
  MYSQL_DATABASE: string;
}
