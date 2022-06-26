import { EGender, EVip } from './../../../common/enums/index';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

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

  @ApiProperty({
    enum: EVip,
    default: EVip.VIP_1,
    examples: EVip,
  })
  @IsNotEmpty()
  vipId: EVip;
}

@Exclude()
export class UpdatePasswordUser {
  @ApiProperty()
  @Expose()
  oldPassword: string;

  @ApiProperty()
  @Expose()
  password: string;
}

@Exclude()
export class QueryUserDto {
  @ApiPropertyOptional()
  @IsString()
  @Expose()
  keySearch: string;
}

@Exclude()
export class UpgradeVip {
  @ApiProperty({
    enum: EVip,
    default: EVip.VIP_1,
    examples: EVip,
  })
  @IsNotEmpty()
  vipId: EVip;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}

@Exclude()
export class AdminUpgradeVip {
  @ApiProperty({
    enum: EVip,
    default: EVip.VIP_1,
    examples: EVip,
  })
  @IsNotEmpty()
  vipId: EVip;
}
