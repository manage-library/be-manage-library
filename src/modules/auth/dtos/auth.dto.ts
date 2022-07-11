import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

// Login
@Exclude()
export class LoginRequestDto {
  @ApiProperty({
    example: 'test@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email: string;

  @ApiProperty({
    example: '123456',
  })
  @IsNotEmpty()
  @Expose()
  password: string;
}

@Exclude()
export class LoginResponseDto {}

// Register
@Exclude()
export class RegisterRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  @Expose()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  fullName: string;
}

@Exclude()
export class ForgotPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email: string;
}

export class VerifyForgotPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  password: string;
}

@Exclude()
export class registerResponseDto {}
