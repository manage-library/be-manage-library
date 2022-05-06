import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

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
  @MaxLength(50)
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
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50)
  @Expose()
  fullName: string;
}

@Exclude()
export class UpdatePasswordUser {
  @ApiProperty()
  @Expose()
  password: string;
}
