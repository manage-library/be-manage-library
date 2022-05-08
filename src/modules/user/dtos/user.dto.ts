import { EGender } from './../../../common/enums/index';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { UserEntity } from '@src/modules/user/user.entity';

@Exclude()
export class UserResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  fullName: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  password: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  constructor(data: Partial<UserResponseDto>) {
    Object.assign(this, data);
  }
}

@Exclude()
export class UserRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  fullName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  password: string;

  constructor(data: Partial<UserEntity>) {
    Object.assign(this, data);
  }
}

@Exclude()
export class UpdateProfileUser {
  @ApiPropertyOptional()
  @IsString()
  @Expose()
  fullName: string;

  @ApiPropertyOptional()
  @IsDate()
  @Expose()
  dateOfBirth: Date;

  @ApiPropertyOptional({
    enum: EGender,
    default: EGender.FEMALE,
    examples: EGender,
  })
  gender: EGender;

  @ApiPropertyOptional()
  @IsString()
  avatar: string;
}

@Exclude()
export class UpdatePasswordUser {
  @ApiProperty()
  @Expose()
  password: string;
}
