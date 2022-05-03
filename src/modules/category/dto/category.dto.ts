import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class CreateCategoryRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;
}

export class UpdateCategoryRequestDto extends CreateCategoryRequestDto {}
